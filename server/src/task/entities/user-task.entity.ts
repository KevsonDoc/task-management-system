import { ApiProperty } from '@nestjs/swagger';

export class UserTaskEntity {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public userId: string;

  @ApiProperty()
  public taskId: string;

  @ApiProperty()
  public createAt: Date;

  @ApiProperty()
  public deletedAt: Date | null;

  constructor(userTask: Partial<UserTaskEntity>) {
    Object.assign(this, userTask);
  }
}
