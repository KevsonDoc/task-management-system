import { Inject } from '@nestjs/common';
import {
  FindResultUseCase,
  IFindProjectUseCase,
} from '../contracts/find-project.use-case';
import { IProjectRepository } from '../contracts/project-repository.contract';

export class FindProjectUseCase implements IFindProjectUseCase {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: IProjectRepository,
  ) {}

  public async execute(
    page: number,
    limit: number,
    userId: string,
  ): Promise<FindResultUseCase> {
    return this.projectRepository.find({ userId }, { limit, page });
  }
}
