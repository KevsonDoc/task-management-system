import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCase } from '../use-case/login.use-case';
import { AuthenticationController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [LoginUseCase],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
