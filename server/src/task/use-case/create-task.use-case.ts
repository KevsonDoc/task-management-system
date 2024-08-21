import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Permissions } from 'src/_share/enum/permissions.enum';
import { IProjectRepository } from 'src/project/contracts/project-repository.contract';
import * as uuid from 'uuid';
import { ICreateTaskUseCasContract } from '../contracts/create-task-use-case.contract';
import { ITaskRepositoryContract } from '../contracts/task-repository.contract';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class CreateTaskUseCase implements ICreateTaskUseCasContract {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: ITaskRepositoryContract,

    @Inject('ProjectRepository')
    private readonly projectRepository: IProjectRepository,
  ) {}

  public async execute(
    userId: string,
    projectId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<TaskEntity> {
    const project = await this.projectRepository.findOne({
      userId,
      project: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(['Projeto não encontrado']);
    }

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
