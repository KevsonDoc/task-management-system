import { ApiProperty } from '@nestjs/swagger';
import { Priority, Status } from '@prisma/client';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';

export class FindTaskDto {
  @ApiProperty()
  @IsNumberString()
  public page: number;

  @ApiProperty()
  @IsNumberString()
  public limit: number;

  @ApiProperty({
    required: false,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT', 'CRITICAL'],
  })
  @IsEnum(Priority)
  @IsOptional()
  public priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';

  @ApiProperty({
    required: false,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT', 'CRITICAL'],
  })
  @IsEnum(Status)
  @IsOptional()
  public status?:
    | 'BACKLOG'
    | 'TODO'
    | 'IN_DEVELOPMENT'
    | 'IN_REVIEW'
    | 'TESTING'
    | 'DONE';
}
