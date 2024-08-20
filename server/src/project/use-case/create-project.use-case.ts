import { Inject, Injectable } from '@nestjs/common';
import { RequirePermissions } from 'src/_share/enum/require-permissions.enum';
import * as uuid from 'uuid';
import { ICreateProjectUseCaseContract } from '../contracts/create-project.use-case.contract';
import { IProjectRepository } from '../contracts/project-repository.contract';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectEntity } from '../entities/project.entity';

@Injectable()
export class CreateProjectUseCase implements ICreateProjectUseCaseContract {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: IProjectRepository,
  ) {}

  public async execute(
    userId: string,
    createProjectDto: CreateProjectDto,
  ): Promise<{ id: string }> {
    const project = new ProjectEntity({
      id: uuid.v4(),
      createdAt: new Date(),
      ...createProjectDto,
    });
    const { id } = await this.projectRepository.save({
      project: project,
      permission: [
        RequirePermissions.READ,
        RequirePermissions.READ_ALL,
        RequirePermissions.CREATE,
        RequirePermissions.UPDATE,
        RequirePermissions.DELETE,
      ],
      relation: { userId },
    });

    return { id };
  }
}
