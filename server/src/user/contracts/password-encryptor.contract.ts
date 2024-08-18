export interface IPasswordEncryptorAdapterContract {
  encrypt(password: string, saltOrRounds: string | number): string;
  compare(password: string, hash: string): boolean;
  genSalt(saltRounds?: number): string;
}
