import { Provider } from '@nestjs/common';
import { CreateProjectUseCase } from './use-case/create-project.use-case';
import { ProjectRepository } from './adapters/repositories/project.repository';
import { FindProjectUseCase } from './use-case/find-project.use-case';
import { DeleteProjectUseCase } from './use-case/delete-project.use-case';

export const projectProvider: Provider[] = [
  {
    provide: 'CreateProjectUseCase',
    useClass: CreateProjectUseCase,
  },
  {
    provide: 'FindUserUseCase',
    useClass: FindProjectUseCase,
  },
  {
    provide: 'DeleteProjectUseCase',
    useClass: DeleteProjectUseCase,
  },
  {
    provide: 'ProjectRepository',
    useClass: ProjectRepository,
  },
];
