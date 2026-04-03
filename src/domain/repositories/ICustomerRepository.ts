import { Customer } from "../../entities/Customer";

export interface ICustomerRepository {
  create(data: { name: string; document: string }): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer | null>;
  update(id: string, data: Partial<Customer>): Promise<void>;
  delete(id: string): Promise<void>;
}
