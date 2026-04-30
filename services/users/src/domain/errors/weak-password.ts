export class WeakPasswordError extends Error {
  constructor(public readonly reason: string) {
    super(`Weak password: ${reason}`);
    this.name = 'WeakPasswordError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
