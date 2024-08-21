import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Título é um campo obrigatório' })
  public title: string;

  @ApiProperty()
  @MaxLength(20000, { message: 'Descrição deve ter até 20000 caracteres' })
  public description: string;
}
