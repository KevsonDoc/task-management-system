import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './controllers/user.controller';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders],
  exports: ['UserRepository', 'PasswordEncryptorAdapter'],
})
export class UserModule {}
