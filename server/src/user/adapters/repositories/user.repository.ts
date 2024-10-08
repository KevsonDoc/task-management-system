import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { IUserRepositoryContract } from 'src/user/contracts/user-repository.contract';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepositoryContract {
  constructor(private readonly prismaService: PrismaService) {}

  public async findOneByEmail(email: string): Promise<Omit<User, 'password'>> {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
        id: true,
        name: true,
        password: false,
      },
    });
  }

  public async find(
    limit: number = 1,
    page: number = 1,
  ): Promise<UserEntity[]> {
    return this.prismaService.user.findMany({
      take: limit,
      skip: limit * page,
    });
  }

  public async findOne(
    user: Partial<UserEntity>,
    option?: { selectPassword?: boolean },
  ): Promise<UserEntity | Partial<UserEntity> | null> {
    return this.prismaService.user.findFirst({
      where: user,
      select: {
        id: true,
        email: true,
        name: true,
        password: option?.selectPassword ?? false,
      },
    });
  }

  public async findOneOrFail(user: Partial<UserEntity>): Promise<UserEntity> {
    return this.prismaService.user.findFirstOrThrow({ where: user });
  }

  public async save(user: UserEntity): Promise<UserEntity> {
    return this.prismaService.user.create({ data: user });
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }
}
