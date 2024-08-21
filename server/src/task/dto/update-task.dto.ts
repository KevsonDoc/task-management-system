import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  public title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public endDate?: Date | null;

  @ApiProperty({
    required: false,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT', 'CRITICAL'],
  })
  @IsOptional()
  public priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';

  @ApiProperty({
    required: false,
    enum: ['BACKLOG', 'TODO', 'IN_DEVELOPMENT', 'IN_REVIEW', 'TESTING', 'DONE'],
  })
  @IsOptional()
  public status?:
    | 'BACKLOG'
    | 'TODO'
    | 'IN_DEVELOPMENT'
    | 'IN_REVIEW'
    | 'TESTING'
    | 'DONE';
}
