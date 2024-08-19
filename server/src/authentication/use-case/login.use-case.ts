import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IPasswordEncryptorAdapterContract } from 'src/user/contracts/password-encryptor.contract';
import { IUserRepositoryContract } from 'src/user/contracts/user-repository.contract';
import { UserEntity } from 'src/user/entity/user.entity';
import { ILoginUseCaseContract } from '../constracts/use-case.contract';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginUseCase implements ILoginUseCaseContract {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepositoryContract,

    @Inject('PasswordEncryptorAdapter')
    private readonly passwordEncryptorAdapter: IPasswordEncryptorAdapterContract,

    private readonly jwtService: JwtService,
  ) {}

  public async execute(
    loginDto: LoginDto,
  ): Promise<{ token: string; user: Partial<UserEntity> }> {
    const user = await this.userRepository.findOne(
      { email: loginDto.email },
      { selectPassword: true },
    );

    if (!user) {
      throw new UnauthorizedException(['E-mail ou senha inválidos']);
    }

    const matchPassword = this.passwordEncryptorAdapter.compare(
      loginDto.password,
      user.password,
    );

    user.password = undefined;

    if (!matchPassword) {
      throw new UnauthorizedException(['E-mail ou senha inválidos']);
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
