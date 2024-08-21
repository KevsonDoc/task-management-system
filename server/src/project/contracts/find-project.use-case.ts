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

export interface IFindProjectUseCase {
  execute(
    page: number,
    limit: number,
    userId: string,
  ): Promise<FindResultUseCase>;
}
