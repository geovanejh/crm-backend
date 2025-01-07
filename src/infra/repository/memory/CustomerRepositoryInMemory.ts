import { Customer } from "../../../model/Customer";
import { CustomerRepository } from "../../../model/repository/CustomerRepository";

export class CustomerRepositoryInMemory implements CustomerRepository {
  private customersCollection: Array<Customer> = [];

  async save(customer: Customer): Promise<void> {
    this.customersCollection.push(customer);
  }

  async getAll(): Promise<Customer[]> {
    return this.customersCollection;
  }
}
