import { ShareTaskDto } from '../dto/share-task.dto';

export interface IShareTaskUseCase {
  execute(
    userId: string,
    taskId: string,
    shareTaskDto: ShareTaskDto,
  ): Promise<void>;
}
