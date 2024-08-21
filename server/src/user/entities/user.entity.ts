export class UserEntity {
  public id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(user: Partial<UserEntity>) {
    Object.assign(this, user);
  }
}
