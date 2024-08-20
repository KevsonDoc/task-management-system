export class ProjectEntity {
  public id: string;

  public title: string;

  public description: string;

  public createdAt: Date;

  public endDate: Date;

  constructor(project: Partial<ProjectEntity>) {
    Object.assign(this, project);
  }
}
