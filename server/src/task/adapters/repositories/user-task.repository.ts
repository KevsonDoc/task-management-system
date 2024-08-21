import { Injectable } from '@nestjs/common';
import { UserTask } from '@prisma/client';
import { Permissions } from 'src/_share/enum/permissions.enum';
import { PrismaService } from 'src/database/prisma.service';
import { IUserTaskRepository } from 'src/task/contracts/user-task-repository.contract';
import { UserTaskEntity } from 'src/task/entities/user-task.entity';
import * as uuid from 'uuid';

@Injectable()
export class UserTaskRepository implements IUserTaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findByUserId(taskId: string, userId: string): Promise<UserTask> {
    return this.prismaService.userTask.findFirst({
      where: {
        taskId: taskId,
        userId,
        deletedAt: null,
      },
    });
  }

  public async save(
    projectId: string,
    task: UserTaskEntity,
    permission: string[],
  ): Promise<UserTask> {
    const [userTask] = await this.prismaService.$transaction([
      this.prismaService.userTask.create({
        data: {
          ...task,
          permission: {
            connect: permission.map((permissionItemId) => ({
              id: permissionItemId,
            })),
          },
        },
      }),
      this.prismaService.userProject.create({
        data: {
          id: uuid.v4(),
          projectId: projectId,
          userId: task.userId,
          permission: {
            connect: [Permissions.READ].map((permissionId) => ({
              id: permissionId,
            })),
          },
          createAt: new Date(),
        },
      }),
    ]);

    return userTask;
  }
}
