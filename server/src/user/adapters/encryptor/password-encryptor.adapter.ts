import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordEncryptorAdapterContract } from 'src/user/contracts/password-encryptor.contract';

@Injectable()
export class PasswordEncryptorAdapter
  implements IPasswordEncryptorAdapterContract
{
  public encrypt(password: string, saltOrRounds: string | number): string {
    return bcrypt.hashSync(password, saltOrRounds);
  }

  compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  genSalt(saltRounds?: number): string {
    return bcrypt.genSaltSync(saltRounds);
  }
}
