export class InvalidTokenError extends Error {
  constructor(reason: string = 'Invalid or expired token') {
    super(reason);
    this.name = 'InvalidTokenError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
