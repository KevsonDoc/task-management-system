import { RequirePermissions } from 'src/_share/enum/require-permissions.enum';
import { ProjectEntity } from '../entities/project.entity';

export type PaginationOption = {
  page: number;
  limit: number;
};

export type WhereOption = {
  project?: Partial<ProjectEntity>;
  userId: string;
};

export type ProjectResultFind = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  endDate: Date;
  users: {
    id: string;
    name: string;
  }[];
};

export type ProjectResultFindOne = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  endDate: Date;
  users: {
    id: string;
    name: string;
    permission: {
      id: string;
      name: string;
    }[];
  }[];
};

export interface RepositoryResult<TEntity> {
  page: number;
  totalPerPage: number;
  total: number;
  nextPage: number;
  previousPage: number;
  data: TEntity[];
}

export interface IProjectRepository {
  find(
    where: WhereOption,
    pagination: PaginationOption,
  ): Promise<RepositoryResult<ProjectResultFind>>;
  findOne(where: WhereOption): Promise<ProjectResultFindOne | null>;
  findOneOrFail(where: WhereOption): Promise<ProjectResultFindOne>;
  save(data: {
    project: Partial<ProjectEntity>;
    permission: RequirePermissions[];
    relation: { userId: string };
  }): Promise<ProjectEntity>;
  update(id: string, project: Partial<ProjectEntity>): Promise<ProjectEntity>;
  delete(id: string): Promise<void>;
}
