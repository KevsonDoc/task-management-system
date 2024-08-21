import { Injectable } from '@nestjs/common';
import { UserTask } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { IUserTaskRepository } from 'src/task/contracts/user-task-repository.contract';
import { UserTaskEntity } from 'src/task/entities/user-task.entity';

@Injectable()
export class UserTaskRepository implements IUserTaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async save(task: UserTaskEntity): Promise<UserTask> {
    return this.prismaService.userTask.create({
      data: task,
    });
  }
}
