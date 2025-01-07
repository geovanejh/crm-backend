import { Request, Response } from "express";
import { Customer } from "../model/Customer";
import { Uuid } from "../model/Uuid";
import {
  CustomerCreateService,
  CustomerDeleteService,
  CustomerEditService,
  CustomerGetAllService,
  CustomerGetByIdService,
} from "../services/customerService";

export class CustomerCreate {
  constructor(readonly service: CustomerCreateService) {}

  async execute(request: Request, response: Response) {
    const { name, document } = request.body;
    const customer = Customer.create(name, document);
    await this.service.execute(customer);
    response.status(201).json({ customer });
  }
}

export class CustomerGetAll {
  constructor(readonly service: CustomerGetAllService) {}

  async execute(request: Request, response: Response) {
    const customers = await this.service.execute();
    response.status(200).json({ customers });
  }
}

export class CustomerGetById {
  constructor(readonly service: CustomerGetByIdService) {}

  async execute(request: Request, response: Response) {
    const id: Uuid = new Uuid(request.params.id);
    const customer = await this.service.execute(id);
    response.status(200).json({ customer });
  }
}

export class CustomerEdit {
  constructor(readonly service: CustomerEditService) {}

  async execute(request: Request, response: Response) {
    const id: Uuid = new Uuid(request.params.id);
    const { name, document } = request.body;
    const customer = Customer.create(name, document, id.getValue());
    await this.service.execute(customer);
    response.status(200).json({ customer });
  }
}

export class CustomerDelete {
  constructor(readonly service: CustomerDeleteService) {}

  async execute(request: Request, response: Response) {
    const id: Uuid = new Uuid(request.params.id);
    await this.service.execute(id);
    response
      .status(200)
      .send({ message: `Customer with id ${id.getValue()} deleted` });
  }
}
