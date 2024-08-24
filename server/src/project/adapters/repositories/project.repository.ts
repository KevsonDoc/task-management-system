import { Injectable } from '@nestjs/common';
import { Permissions } from 'src/_share/enum/permissions.enum';
import { PrismaService } from 'src/database/prisma.service';
import {
  IProjectRepository,
  PaginationOption,
  ProjectResultFind,
  ProjectResultFindOne,
  RepositoryResult,
  WhereOption,
} from 'src/project/contracts/project-repository.contract';
import { ProjectEntity } from 'src/project/entities/project.entity';
import * as uuid from 'uuid';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async find(
    where: WhereOption,
    { page = 1, limit = 10 }: PaginationOption,
  ): Promise<RepositoryResult<ProjectResultFind>> {
    const projects = await this.prismaService.project.findMany({
      where: {
        ...where.project,
        userProject: {
          some: {
            userId: where.userId,
          },
        },
      },
      include: {
        userProject: {
          include: {
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

    const total = await this.prismaService.project.count({
      where: {
        ...where.project,
        AND: {
          userProject: {
            some: {
              userId: where.userId,
            },
          },
        },
      },
    });

    return {
      page,
      nextPage: page++,
      previousPage: page--,
      totalPerPage: projects.length,
      total: total,
      data: projects.map(({ userProject, ...rest }) => ({
        ...rest,
        users: userProject.map(({ user }) => ({
          ...user,
        })),
      })),
    };
  }

  public async findOne(
    where: WhereOption,
  ): Promise<ProjectResultFindOne | null> {
    const project = await this.prismaService.project.findFirst({
      where: {
        ...where.project,
        AND: {
          userProject: {
            some: {
              userId: where.userId,
            },
          },
        },
      },
      include: {
        userProject: {
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

    if (!project) {
      return null;
    }

    const { userProject, ...rest } = project;

    return {
      ...rest,
      users: userProject.map(({ user, permission }) => ({
        ...user,
        permission,
      })),
    };
  }

  public async findOneOrFail(
    where: WhereOption,
  ): Promise<ProjectResultFindOne> {
    const project = await this.prismaService.project.findFirstOrThrow({
      where: {
        ...where.project,
        AND: {
          userProject: {
            some: {
              userId: where.userId,
            },
          },
        },
      },
      include: {
        userProject: {
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

    if (!project) {
      return null;
    }

    const { userProject, ...rest } = project;
    return {
      ...rest,
      users: userProject.map(({ user, permission }) => ({
        ...user,
        permission,
      })),
    };
  }

  public async save(option: {
    project: ProjectEntity;
    permission: Permissions[];
    relation: { userId: string };
  }): Promise<ProjectEntity> {
    const { project, relation, permission } = option;
    return this.prismaService.project.create({
      data: {
        ...project,
        userProject: {
          create: {
            id: uuid.v4(),
            userId: relation.userId,
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

  public async update(
    id: string,
    project: Partial<ProjectEntity>,
  ): Promise<ProjectEntity> {
    return this.prismaService.project.update({
      where: {
        id: id,
      },
      data: project,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.$transaction(async (tx) => {
      const project = await tx.project.findFirst({
        where: { id },
        include: { userProject: true },
      });

      await Promise.all(
        project.userProject.map((item) =>
          tx.userProject.delete({ where: { id: item.id } }),
        ),
      );
      await tx.project.delete({ where: { id } });
    });
  }
}
