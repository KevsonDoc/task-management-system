import { Provider } from '@nestjs/common';
import { CreateTaskUseCase } from './use-case/create-task.use-case';
import { FindTaskUseCase } from './use-case/find-task.use-case';
import { UpdateTaskUseCase } from './use-case/update-task.use-case';
import { TaskRepository } from './adapters/repositories/task.repository';
import { FindTaskByIdUseCase } from './use-case/find-task-by-id.use-case';
import { UserTaskRepository } from './adapters/repositories/user-task.repository';
import { ShareTaskUseCase } from './use-case/share-task.use-case';

export const taskProvider: Provider[] = [
  {
    provide: 'CreateTaskUseCase',
    useClass: CreateTaskUseCase,
  },
  {
    provide: 'FindTaskUseCase',
    useClass: FindTaskUseCase,
  },
  {
    provide: 'UpdateTaskUseCase',
    useClass: UpdateTaskUseCase,
  },
  {
    provide: 'FindTaskByIdUseCase',
    useClass: FindTaskByIdUseCase,
  },
  {
    provide: 'ShareTaskUseCase',
    useClass: ShareTaskUseCase,
  },
  {
    provide: 'TaskRepository',
    useClass: TaskRepository,
  },
  {
    provide: 'UserTaskRepository',
    useClass: UserTaskRepository,
  },
];
