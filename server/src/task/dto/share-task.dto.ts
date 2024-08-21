import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export enum Permissions {
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class ShareTaskDto {
  @ApiProperty()
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    enum: ['READ', 'UPDATE', 'DELETE'],
    isArray: true,
    example: ['READ', 'UPDATE', 'DELETE'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Permissions, { each: true })
  public permission: Permissions[];
}
