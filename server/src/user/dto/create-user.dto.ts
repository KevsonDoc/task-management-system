import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: faker.person.fullName() })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ example: faker.internet.email() })
  @IsEmail({}, { message: 'E-mail inválido' })
  public email: string;

  @ApiProperty({ example: faker.internet.password() + 12345 })
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 10,
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    },
    {
      message(validationArguments) {
        const { minLength } = validationArguments.constraints[0];
        return `A senha deve ter pelo menos ${minLength} caracteres.`;
      },
    },
  )
  public password: string;
}
