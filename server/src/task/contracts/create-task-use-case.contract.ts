import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from '../entities/task.entity';

export interface ICreateTaskUseCasContract {
  execute(userId: string, task: CreateTaskDto): Promise<TaskEntity>;
}
