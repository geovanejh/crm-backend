import { Request, Response } from "express";
import { CustomerRepository } from "../model/repository/CustomerRepository";
import { Customer } from "../model/Customer";
import { Uuid } from "../model/Uuid";

export class CustomerCreate {
  constructor(readonly repository: CustomerRepository) {}

  async execute(request: Request, response: Response) {
    const { name, document } = request.body;

    const customer = Customer.create(name, document);
    await this.repository.save(customer);
    response.status(201).json({ customer });
  }
}

export class CustomerList {
  constructor(readonly repository: CustomerRepository) {}

  async execute(request: Request, response: Response) {
    const customers = await this.repository.getAll();
    response.status(200).json({ customers });
  }
}

export class CustomerListById {
  constructor(readonly repository: CustomerRepository) {}

  async execute(request: Request, response: Response) {
    const id: Uuid = new Uuid(request.params.id);
    const customer = await this.repository.getById(id);
    response.status(200).json({ customer });
  }
}

export class CustomerEditById {
  constructor(readonly repository: CustomerRepository) {}

  async execute(request: Request, response: Response) {
    const id: Uuid = new Uuid(request.params.id);
    const { name, document } = request.body;

    const customer = Customer.create(name, document, id.getValue());
    await this.repository.editById(id, customer);
    response.status(200).json({ customer });
  }
}

export class CustomerDeleteById {
  constructor(readonly repository: CustomerRepository) {}

  async execute(request: Request, response: Response) {
    const id: Uuid = new Uuid(request.params.id);
    await this.repository.deleteById(id);
    response.status(200).send();
  }
}
