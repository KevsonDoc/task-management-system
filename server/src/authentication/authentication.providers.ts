import { Provider } from '@nestjs/common';
import { LoginUseCase } from './use-case/login.use-case';

export const authenticationProviders: Provider[] = [
  {
    provide: 'LoginUseCase',
    useClass: LoginUseCase,
  },
];
