export class PermissionsEntity {
  public id: string;

  public name: string;

  constructor(permissions: Partial<PermissionsEntity>) {
    Object.assign(this, permissions);
  }
}
