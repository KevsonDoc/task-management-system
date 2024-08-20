import { UserEntity } from '../entities/user.entity';

export interface IUserRepositoryContract {
  find(limit: number, page: number): Promise<UserEntity[]>;
  findOne(
    user: Partial<UserEntity>,
    option?: { selectPassword?: boolean },
  ): Promise<UserEntity | Partial<UserEntity> | null>;
  findOneOrFail(user: Partial<UserEntity>): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
  update(id: string, user: Partial<UserEntity>): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
