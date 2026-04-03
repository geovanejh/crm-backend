import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Customer } from "../entities/Customer";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";

export class CustomerRepository implements ICustomerRepository {
  private repo: Repository<Customer>;

  constructor() {
    this.repo = AppDataSource.getRepository(Customer);
  }

  async create(data: { name: string; document: string }): Promise<Customer> {
    const customer = this.repo.create(data);
    return this.repo.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Customer | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, data: Partial<Customer>): Promise<void> {
    await this.repo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
