import { UserTask } from '@prisma/client';
import { UserTaskEntity } from '../entities/user-task.entity';

export interface IUserTaskRepository {
  findByUserId(taskId: string, userId: string): Promise<UserTask>;
  save(
    projectId: string,
    task: UserTaskEntity,
    permission: string[],
  ): Promise<UserTask>;
}
