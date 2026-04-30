export class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`Invalid email format: ${email}`);
    this.name = 'InvalidEmailError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
