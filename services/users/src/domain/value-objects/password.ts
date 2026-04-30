import { WeakPasswordError } from '../errors/weak-password';

export class Password {
  constructor(private readonly password: string) {}

  static fromHash(hash: string): Password {
    return new Password(hash);
  }

  static validateStrength(plain: string): void {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!regex.test(plain))
      throw new WeakPasswordError(
        'Password must be at least 8 characters long and contain uppercase letters, lowercase letters, numbers and symbols',
      );
  }

  get value(): string {
    return this.password;
  }
}
