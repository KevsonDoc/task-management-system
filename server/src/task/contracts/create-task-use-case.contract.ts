import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from '../entities/task.entity';

export interface ICreateTaskUseCasContract {
  execute(
    userId: string,
    projectId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<TaskEntity>;
}
