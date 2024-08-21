import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  FindOneTaskdeResult,
  FindOneTaskOption,
  IFindTaskByIdUseCase,
} from '../contracts/find-task-by-id-use-case.contract';
import { ITaskRepositoryContract } from '../contracts/task-repository.contract';

@Injectable()
export class FindTaskByIdUseCase implements IFindTaskByIdUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: ITaskRepositoryContract,
  ) {}

  public async execute({
    taskId,
    userId,
  }: FindOneTaskOption): Promise<FindOneTaskdeResult> {
    const task = this.taskRepository.findOne({ taskId, userId });

    if (!task) {
      throw new NotFoundException(['Tarefa não encontrada']);
    }

    return task;
  }
}
