export class InvalidPhoneError extends Error {
  constructor(public readonly phone: string) {
    super(`Invalid phone number "${phone}"`);
    this.name = 'InvalidPhoneError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
