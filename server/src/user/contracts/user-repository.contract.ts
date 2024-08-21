import { User } from '@prisma/client';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepositoryContract {
  find(limit: number, page: number): Promise<UserEntity[]>;
  findOne(
    user: Partial<UserEntity>,
    option?: { selectPassword?: boolean },
  ): Promise<UserEntity | Partial<UserEntity> | null>;
  findOneByEmail(email: string): Promise<Omit<User, 'password'>>;
  findOneOrFail(user: Partial<UserEntity>): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
  update(id: string, user: Partial<UserEntity>): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
