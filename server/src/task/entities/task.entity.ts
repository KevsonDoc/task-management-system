import { ApiProperty } from '@nestjs/swagger';

export class TaskEntity {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public projectId: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public endDate: Date;

  @ApiProperty()
  public deletedAt: Date;

  @ApiProperty()
  public priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';

  @ApiProperty()
  public status:
    | 'BACKLOG'
    | 'TODO'
    | 'IN_DEVELOPMENT'
    | 'IN_REVIEW'
    | 'TESTING'
    | 'DONE';

  constructor(task: Partial<TaskEntity>) {
    Object.assign(this, task);
  }
}
