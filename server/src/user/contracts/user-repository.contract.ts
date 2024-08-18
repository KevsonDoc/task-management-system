import { UserEntity } from '../entity/user.entity';

export interface IUserRepositoryContract {
  find(limit: number, page: number): Promise<UserEntity[]>;
  findOne(user: Partial<UserEntity>): Promise<UserEntity | null>;
  findOneOrFail(user: Partial<UserEntity>): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
  update(id: string, user: Partial<UserEntity>): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
