import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface ICreateUserUseCaseContract {
  execute(createUserDto: CreateUserDto): Promise<UserEntity>;
}
