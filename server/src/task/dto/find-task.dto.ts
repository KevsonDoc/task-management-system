import { IsNumberString } from 'class-validator';

export class FindTaskDto {
  @IsNumberString()
  public page: number;

  @IsNumberString()
  public limit: number;

  @IsNumberString()
  public priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';

  @IsNumberString()
  public status:
    | 'BACKLOG'
    | 'TODO'
    | 'IN_DEVELOPMENT'
    | 'IN_REVIEW'
    | 'TESTING'
    | 'DONE';
}
