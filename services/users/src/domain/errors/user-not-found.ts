export class UserNotFoundError extends Error {
  constructor(public readonly identifier: string) {
    super(`User "${identifier}" not found`);
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
