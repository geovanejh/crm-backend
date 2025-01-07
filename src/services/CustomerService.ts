import { Customer } from "../model/Customer";
import { CustomerRepository } from "../model/repository/CustomerRepository";
import { Uuid } from "../model/Uuid";

export class CustomerCreateService {
  constructor(readonly repository: CustomerRepository) {}

  async execute(customer: Customer) {
    await this.repository.create(customer);
    return customer;
  }
}

export class CustomerGetAllService {
  constructor(readonly repository: CustomerRepository) {}

  async execute() {
    return await this.repository.getAll();
  }
}

export class CustomerGetByIdService {
  constructor(readonly repository: CustomerRepository) {}

  async execute(id: Uuid) {
    return await this.repository.getById(id);
  }
}

export class CustomerEditService {
  constructor(readonly repository: CustomerRepository) {}

  async execute(customer: Customer) {
    return await this.repository.editById(customer.getId(), customer);
  }
}

export class CustomerDeleteService {
  constructor(readonly repository: CustomerRepository) {}

  async execute(id: Uuid) {
    await this.repository.deleteById(id);
  }
}
