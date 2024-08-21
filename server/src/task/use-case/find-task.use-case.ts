import { Inject, Injectable } from '@nestjs/common';
import { Permissions } from 'src/_share/enum/permissions.enum';
import { IProjectRepository } from 'src/project/contracts/project-repository.contract';
import {
  FindResultUseCase,
  FindTaskOption,
  IFindTaskUseCase,
} from '../contracts/find-task-use-case.contract';
import { ITaskRepositoryContract } from '../contracts/task-repository.contract';

@Injectable()
export class FindTaskUseCase implements IFindTaskUseCase {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: IProjectRepository,

    @Inject('TaskRepository')
    private readonly taskRepository: ITaskRepositoryContract,
  ) {}

  public async execute({
    projectId,
    userId,
    limit,
    page,
    priority,
    status,
  }: FindTaskOption): Promise<FindResultUseCase> {
    const project = await this.projectRepository.findOne({
      project: { id: projectId },
    });

    const user = project.users.find((userItem) => userItem.id === userId);

    const canReadAllTasks = user.permission
      .map(({ id }) => id)
      .includes(Permissions.READ_ALL);

    return this.taskRepository.find({
      limit: +limit ?? undefined,
      page: +page ?? undefined,
      projectId,
      priority,
      status,
      userId: canReadAllTasks ? userId : undefined,
    });
  }
}
