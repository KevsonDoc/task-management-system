import { Inject, NotFoundException } from '@nestjs/common';
import { IDeleteProjectUseCase } from '../contracts/delete-project.use-case';
import { IProjectRepository } from '../contracts/project-repository.contract';

export class DeleteProjectUseCase implements IDeleteProjectUseCase {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: IProjectRepository,
  ) {}

  public async execute(userId: string, projectId: string): Promise<void> {
    const project = await this.projectRepository.findOne({
      userId,
      project: { id: projectId, endDate: null },
    });

    if (!project) {
      throw new NotFoundException(['Projeto não encontrado']);
    }

    await this.projectRepository.delete(projectId);
  }
}
