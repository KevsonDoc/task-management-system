import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Permissions } from 'src/_share/enum/permissions.enum';
import * as uuid from 'uuid';
import { ICreateTaskUseCasContract } from '../contracts/create-task-use-case.contract';
import { ITaskRepositoryContract } from '../contracts/task-repository.contract';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class CreateTaskUseCase implements ICreateTaskUseCasContract {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: ITaskRepositoryContract,
  ) {}

  public async execute(
    userId: string,
    { projectId, ...createTaskDto }: TaskEntity,
  ): Promise<TaskEntity> {
    const task = new TaskEntity({
      id: uuid.v4(),
      createdAt: new Date(),
      ...createTaskDto,
    });

    try {
      return this.taskRepository.save({
        projectId,
        userId,
        task,
        permission: [Permissions.READ, Permissions.UPDATE, Permissions.DELETE],
      });
    } catch (error) {
      throw new InternalServerErrorException(['Erro no servidor']);
    }
  }
}
