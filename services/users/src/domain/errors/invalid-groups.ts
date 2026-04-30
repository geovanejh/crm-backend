export class InvalidGroupsError extends Error {
  constructor(public readonly groups: string[]) {
    super(`Invalid group(s) provided: ${groups.join(', ')}`);
    this.name = 'InvalidGroupsError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
