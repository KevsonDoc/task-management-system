import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ILoginUseCaseContract } from '../constracts/use-case.contract';
import { LoginDto } from '../dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    @Inject('LoginUseCase')
    private readonly loginUseCase: ILoginUseCaseContract,
  ) {}

  @Post('login')
  create(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }
}
