import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from '../dto/login.dto';

export interface ILoginUseCaseContract {
  execute(
    loginDto: LoginDto,
  ): Promise<{ token: string; user: Partial<UserEntity> }>;
}
