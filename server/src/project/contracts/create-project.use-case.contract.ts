import { CreateProjectDto } from '../dto/create-project.dto';

export interface ICreateProjectUseCaseContract {
  execute(
    userId: string,
    createProjectDto: CreateProjectDto,
  ): Promise<{ id: string }>;
}
