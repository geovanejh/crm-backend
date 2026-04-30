import { InvalidEmailError } from '../errors/invalid-email';

export class Email {
  constructor(private readonly email: string) {}

  static create(email: string): Email {
    // Basic email validation regex
    const normalize = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalize)) {
      throw new InvalidEmailError(email);
    }
    return new Email(normalize);
  }

  static rehydrate(email: string): Email {
    return new Email(email);
  }

  equals(other: Email): boolean {
    return this.email === other.email;
  }

  get value(): string {
    return this.email;
  }
}
