export interface IDeleteProjectUseCase {
  execute(userId: string, projectId: string): Promise<void>;
}
