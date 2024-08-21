import { Permissions } from 'src/_share/enum/permissions.enum';
import { ITaskRepositoryContract } from '../contracts/task-repository.contract';
import { IUpdateTaskUseCaseContract } from '../contracts/update-task-use-case.contract';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class UpdateTaskUseCase implements IUpdateTaskUseCaseContract {
  constructor(private readonly taskRepository: ITaskRepositoryContract) {}

  public async execute(
    userId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ taskId, userId });

    if (!task) {
      throw new NotFoundException(['Tarefa não encontrada']);
    }

    const user = task.users.find((userItem) => userItem.id === userId);

    const canUpdateTasks = user.permission
      .map(({ name }) => name)
      .includes(Permissions.UPDATE);

    if (!canUpdateTasks) {
      throw new ForbiddenException([
        'Vocẽ não tem autorização para atualizar essa tarefa',
      ]);
    }

    return this.taskRepository.update({
      taskId,
      task: { ...task, ...updateTaskDto },
    });
  }
}
