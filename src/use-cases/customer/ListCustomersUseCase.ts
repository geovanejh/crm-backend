import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";

export class ListCustomersUseCase {
  constructor(private customerRepo: ICustomerRepository) {}

  async execute() {
    return this.customerRepo.findAll();
  }
}
