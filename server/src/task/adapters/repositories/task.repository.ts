import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import {
  FindOneTaskdeResult,
  FindOneTaskOption,
  FindTaskOption,
  FindTaskResultUseCase,
  ITaskRepositoryContract,
  SaveTaskOption,
  UpdateTaskOption,
} from 'src/task/contracts/task-repository.contract';
import { TaskEntity } from 'src/task/entities/task.entity';
import * as uuid from 'uuid';

@Injectable()
export class TaskRepository implements ITaskRepositoryContract {
  constructor(private readonly prismaService: PrismaService) {}

  public async find({
    page,
    limit,
    projectId,
    userId,
    priority,
    status,
  }: FindTaskOption): Promise<FindTaskResultUseCase> {
    console.log(userId);

    const task = await this.prismaService.task.findMany({
      where: {
        projectId,
        status,
        priority,
        deletedAt: null,
        AND: userId
          ? {
              userTask: {
                some: {
                  userId,
                },
              },
            }
          : undefined,
      },
      include: {
        userTask: {
          include: {
            permission: {
              select: {
                id: true,
                name: true,
              },
            },
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.prismaService.task.count({
      where: {
        projectId,
        status,
        priority,
        deletedAt: null,
        AND: {
          userTask: {
            some: {
              userId,
            },
          },
        },
      },
    });

    return {
      page,
      nextPage: page++,
      previousPage: page--,
      totalPerPage: task.length,
      total: total,
      data: task.map(({ userTask, ...rest }) => ({
        ...rest,
        users: userTask.map(({ user, permission }) => ({
          ...user,
          permission,
        })),
      })),
    };
  }

  public async findOne({
    taskId,
    userId,
  }: FindOneTaskOption): Promise<FindOneTaskdeResult> {
    const task = await this.prismaService.task.findFirst({
      where: {
        id: taskId,
        deletedAt: null,
        userTask: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        userTask: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            permission: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!task) return null;
    const { userTask, ...rest } = task;
    return {
      ...rest,
      users: userTask.map(({ user, permission }) => ({ ...user, permission })),
    };
  }

  public async findOneOrFail({
    taskId,
    userId,
  }: FindOneTaskOption): Promise<FindOneTaskdeResult> {
    const task = await this.prismaService.task.findFirstOrThrow({
      where: {
        id: taskId,
        deletedAt: null,
        userTask: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        userTask: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            permission: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!task) return null;
    const { userTask, ...rest } = task;

    return {
      ...rest,
      users: userTask.map(({ user, permission }) => ({ ...user, permission })),
    };
  }

  public async save({
    task,
    permission,
    userId,
    projectId,
  }: SaveTaskOption): Promise<TaskEntity> {
    return this.prismaService.task.create({
      include: {
        project: true,
      },
      data: {
        ...task,
        project: {
          connect: {
            id: projectId,
          },
        },
        userTask: {
          create: {
            id: uuid.v4(),
            createAt: new Date(),
            userId,
            permission: {
              connect: permission.map((permissionItem) => ({
                id: permissionItem,
              })),
            },
          },
        },
      },
    });
  }

  public async update({ taskId, task }: UpdateTaskOption): Promise<TaskEntity> {
    return this.prismaService.task.update({
      where: {
        id: taskId,
        deletedAt: null,
      },
      data: task,
    });
  }

  public async delete(taskId: string): Promise<void> {
    await this.prismaService.$transaction(async (tx) => {
      const project = await tx.task.findFirst({
        where: { id: taskId },
        include: { userTask: true },
      });

      await Promise.all(
        project.userTask.map((item) =>
          tx.userProject.delete({ where: { id: item.id } }),
        ),
      );
      await tx.project.delete({ where: { id: taskId } });
    });
  }
}
