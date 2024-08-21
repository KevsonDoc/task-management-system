import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Permissions } from 'src/_share/enum/permissions.enum';
import { IUserRepositoryContract } from 'src/user/contracts/user-repository.contract';
import * as uuid from 'uuid';
import { IShareTaskUseCase } from '../contracts/share-task.use-case';
import { ITaskRepositoryContract } from '../contracts/task-repository.contract';
import { IUserTaskRepository } from '../contracts/user-task-repository.contract';
import { ShareTaskDto } from '../dto/share-task.dto';
import { UserTaskEntity } from '../entities/user-task.entity';

@Injectable()
export class ShareTaskUseCase implements IShareTaskUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: ITaskRepositoryContract,

    @Inject('UserRepository')
    private readonly userRepository: IUserRepositoryContract,

    @Inject('UserTaskRepository')
    private readonly userTaskRepository: IUserTaskRepository,
  ) {}

  public async execute(
    userId: string,
    taskId: string,
    shareTaskDto: ShareTaskDto,
  ): Promise<void> {
    const user = await this.userRepository.findOneByEmail(shareTaskDto.email);

    if (!user) {
      throw new ForbiddenException(['E-mail não encontrado']);
    }

    const userTask = await this.userTaskRepository.findByUserId(
      taskId,
      user.id,
    );

    if (userTask) {
      throw new ForbiddenException([
        'Tarefa já está compartilhada com esse e-mail',
      ]);
    }

    const task = await this.taskRepository.findOne({ taskId, userId });

    if (!task) {
      throw new NotFoundException(['Tarefa não encontrada.']);
    }

    const userTaskEntity = new UserTaskEntity({
      id: uuid.v4(),
      createAt: new Date(),
      taskId,
      userId: user.id,
    });

    await this.userTaskRepository.save(
      task.projectId,
      userTaskEntity,
      shareTaskDto.permission.map(
        (permissionItem) => Permissions[permissionItem],
      ),
    );
  }
}
