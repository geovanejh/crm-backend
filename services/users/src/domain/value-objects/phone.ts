import { InvalidPhoneError } from '../errors/invalid-phone';

export class Phone {
  constructor(private readonly phone: string) {}

  static create(phone: string): Phone {
    const normalized = phone.replace(/\D/g, '');
    const phoneRegex = /^(?:55)?[1-9]{2}(?:9\d{8}|[2-8]\d{7})$/;

    if (!phoneRegex.test(normalized)) {
      throw new InvalidPhoneError('Invalid phone number format');
    }

    return new Phone(normalized);
  }

  static rehydrate(phone: string): Phone {
    return new Phone(phone);
  }

  equals(other: Phone): boolean {
    return this.phone === other.phone;
  }

  get value(): string {
    return this.phone;
  }
}
