import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { IPasswordEncryptorAdapterContract } from '../contracts/password-encryptor.contract';
import { ICreateUserUseCaseContract } from '../contracts/use-case.contract';
import { IUserRepositoryContract } from '../contracts/user-repository.contract';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCaseContract {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepositoryContract,

    @Inject('PasswordEncryptorAdapter')
    private readonly passwordEncryptorAdapter: IPasswordEncryptorAdapterContract,
  ) {}

  public async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userAlreadyRegistered = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (userAlreadyRegistered) {
      throw new ForbiddenException(['Já existe um usupario com esse e-mail']);
    }

    const hash = this.passwordEncryptorAdapter.encrypt(
      createUserDto.password,
      this.passwordEncryptorAdapter.genSalt(),
    );

    const user = new UserEntity({
      id: uuid.v4(),
      ...createUserDto,
      password: hash,
    });

    return this.userRepository.save(user);
  }
}
