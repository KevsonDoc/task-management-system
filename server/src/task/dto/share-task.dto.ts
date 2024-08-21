import { IsEmail, IsNotEmpty } from 'class-validator';

export class ShareTaskDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty()
  email: string;
}
