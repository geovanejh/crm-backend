import { Document } from "./Document";

export class Cnpj implements Document {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  static isValid(value: string): boolean {
    return value.length === 14;
  }

  getDocument(): Document {
    return this;
  }

  getValue(): string {
    return this.value;
  }
}
