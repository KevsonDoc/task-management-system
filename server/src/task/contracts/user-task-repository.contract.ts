import { UserTask } from '@prisma/client';
import { UserTaskEntity } from '../entities/user-task.entity';

export interface IUserTaskRepository {
  save(task: UserTaskEntity): Promise<UserTask>;
}
