import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  public title: string;

  @ApiProperty()
  @IsNotEmpty()
  public description: string;

  @ApiProperty()
  public endDate?: Date | null;

  @ApiProperty({ enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT', 'CRITICAL'] })
  @IsNotEmpty()
  public priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';

  @ApiProperty({
    enum: ['BACKLOG', 'TODO', 'IN_DEVELOPMENT', 'IN_REVIEW', 'TESTING', 'DONE'],
  })
  @IsNotEmpty()
  public status:
    | 'BACKLOG'
    | 'TODO'
    | 'IN_DEVELOPMENT'
    | 'IN_REVIEW'
    | 'TESTING'
    | 'DONE';
}
