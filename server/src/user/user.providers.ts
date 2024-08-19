import { Provider } from '@nestjs/common';
import { PasswordEncryptorAdapter } from './adapters/encryptor/password-encryptor.adapter';
import { UserRepository } from './adapters/repositories/user.repository';
import { CreateUserUseCase } from './use-case/create-user.use-case';

export const userProviders: Provider[] = [
  {
    provide: 'UserRepository',
    useClass: UserRepository,
  },
  {
    provide: 'PasswordEncryptorAdapter',
    useClass: PasswordEncryptorAdapter,
  },
  {
    provide: 'CreateUserUseCase',
    useClass: CreateUserUseCase,
  },
];
