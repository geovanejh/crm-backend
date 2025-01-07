import { Customer } from "../Customer";
import { Uuid } from "../Uuid";

export interface CustomerRepository {
  deleteById(id: Uuid): unknown;
  create(customer: Customer): Promise<void>;
  getAll(): Promise<Customer[]>;
  getById(id: Uuid): Promise<Customer>;
  editById(id: Uuid, customer: Customer): Promise<void>;
}
