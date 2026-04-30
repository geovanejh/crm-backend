import { randomUUID } from 'crypto';
import { InvalidUserIdError } from '../errors/invalid-user-id';

export class UserId {
  constructor(private readonly id: string) {}

  static generate(): UserId {
    return new UserId(randomUUID());
  }

  static fromString(value: string): UserId {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new InvalidUserIdError(value);
    }
    return new UserId(value);
  }

  equals(other: UserId): boolean {
    return this.id === other.id;
  }

  get value(): string {
    return this.id;
  }
}
