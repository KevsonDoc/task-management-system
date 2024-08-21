import { Permissions } from 'src/_share/enum/permissions.enum';
import { TaskEntity } from '../entities/task.entity';

export type FindTaskOption = {
  projectId: string;
  userId?: string;
  page: number;
  limit: number;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';
  status?:
    | 'BACKLOG'
    | 'TODO'
    | 'IN_DEVELOPMENT'
    | 'IN_REVIEW'
    | 'TESTING'
    | 'DONE';
};

export type FindOneTaskOption = {
  taskId: string;
  userId: string;
};

export type SaveTaskOption = {
  task: TaskEntity;
  userId: string;
  projectId: string;
  permission: Permissions[];
};

export type UpdateTaskOption = {
  taskId: string;
  task: TaskEntity;
};

export type FindTaskResultUseCase = {
  page: number;
  totalPerPage: number;
  total: number;
  nextPage: number;
  previousPage: number;
  data: {
    id: string;
    title: string;
    description: string;
    projectId: string;
    createdAt: Date;
    endDate: Date;
    deletedAt: Date;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';
    status:
      | 'BACKLOG'
      | 'TODO'
      | 'IN_DEVELOPMENT'
      | 'IN_REVIEW'
      | 'TESTING'
      | 'DONE';
    users: {
      id: string;
      name: string;
      permission: {
        id: string;
        name: string;
      }[];
    }[];
  }[];
};

export type FindOneTaskdeResult = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  createdAt: Date;
  endDate: Date;
  deletedAt: Date;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';
  status:
    | 'BACKLOG'
    | 'TODO'
    | 'IN_DEVELOPMENT'
    | 'IN_REVIEW'
    | 'TESTING'
    | 'DONE';
  users: {
    id: string;
    name: string;
    permission: {
      id: string;
      name: string;
    }[];
  }[];
};

export interface ITaskRepositoryContract {
  find(option: FindTaskOption): Promise<FindTaskResultUseCase>;
  findOne(option: FindOneTaskOption): Promise<FindOneTaskdeResult>;
  findOneOrFail(option: FindOneTaskOption): Promise<FindOneTaskdeResult>;
  save(option: SaveTaskOption): Promise<TaskEntity>;
  update(option: UpdateTaskOption): Promise<TaskEntity>;
  delete(taskId: string): Promise<void>;
}
