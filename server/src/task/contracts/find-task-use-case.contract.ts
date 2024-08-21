export type FindResultUseCase = {
  page: number;
  totalPerPage: number;
  total: number;
  nextPage: number;
  previousPage: number;
  data: {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    endDate: Date;
    users: {
      id: string;
      name: string;
    }[];
  }[];
};

export type FindTaskOption = {
  page: number;
  limit: number;
  userId: string;
  projectId: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';
  status?:
    | 'BACKLOG'
    | 'TODO'
    | 'IN_DEVELOPMENT'
    | 'IN_REVIEW'
    | 'TESTING'
    | 'DONE';
};

export interface IFindTaskUseCase {
  execute(option: FindTaskOption): Promise<FindResultUseCase>;
}
