export class InvalidUserIdError extends Error {
  constructor(value: string) {
    super(`Invalid user ID: ${value}`);
    this.name = 'InvalidUserIdError';
  }
}
