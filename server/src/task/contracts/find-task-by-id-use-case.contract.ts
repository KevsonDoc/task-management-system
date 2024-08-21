export type FindOneTaskOption = {
  taskId: string;
  userId: string;
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

export interface IFindTaskByIdUseCase {
  execute(option: FindOneTaskOption): Promise<FindOneTaskdeResult>;
}
