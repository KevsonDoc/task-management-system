import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';

export interface ICreateUserUseCaseContract {
  execute(createUserDto: CreateUserDto): Promise<UserEntity>;
}
