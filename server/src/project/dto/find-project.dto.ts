import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class QueryFindUserQueryParamDto {
  @IsNumberString()
  @ApiProperty()
  public page: number;

  @IsNumberString()
  @ApiProperty()
  public limit: number;
}
