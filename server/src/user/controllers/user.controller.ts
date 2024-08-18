import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateUserUseCaseContract } from '../contracts/use-case.contract';
import { CreateUserDto } from '../dto/create-user.dto';

@ApiTags('User Module')
@Controller('user')
export class UserController {
  constructor(
    @Inject('CreateUserUseCase')
    private readonly createUserUseCase: ICreateUserUseCaseContract,
  ) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    await this.createUserUseCase.execute(createUserDto);
    return ['Usuário criado com sucesso'];
  }
}
