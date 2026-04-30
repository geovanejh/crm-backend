export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
    this.name = 'InvalidCredentialsError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
