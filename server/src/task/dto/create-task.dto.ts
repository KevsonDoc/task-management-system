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
  @IsNotEmpty()
  public projectId: string;

  @ApiProperty()
  @IsNotEmpty()
  public endDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  public priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';

  @ApiProperty()
  @IsNotEmpty()
  public status:
    | 'BACKLOG'
    | 'TODO'
    | 'IN_DEVELOPMENT'
    | 'IN_REVIEW'
    | 'TESTING'
    | 'DONE';
}
