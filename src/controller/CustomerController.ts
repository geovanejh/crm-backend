import { NextFunction, Request, Response } from "express";
import { Customer } from "../model/Customer";
import { Uuid } from "../model/Uuid";
import {
  CustomerCreateService,
  CustomerDeleteService,
  CustomerEditService,
  CustomerGetAllService,
  CustomerGetByIdService,
} from "../services/CustomerService";

export class CustomerCreate {
  constructor(readonly service: CustomerCreateService) {}

  async execute(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, document } = request.body;
      const customer = Customer.create(name, document);
      await this.service.execute(customer);
      response.status(201).json({ customer });
    } catch (error) {
      next(error);
    }
  }
}

export class CustomerGetAll {
  constructor(readonly service: CustomerGetAllService) {}

  async execute(request: Request, response: Response, next: NextFunction) {
    try {
      const customers = await this.service.execute();
      response.status(200).json({ customers });
    } catch (error) {
      next(error);
    }
  }
}

export class CustomerGetById {
  constructor(readonly service: CustomerGetByIdService) {}

  async execute(request: Request, response: Response, next: NextFunction) {
    try {
      const id: Uuid = new Uuid(request.params.id);
      const customer = await this.service.execute(id);
      response.status(200).json({ customer });
    } catch (error) {
      next(error);
    }
  }
}

export class CustomerEdit {
  constructor(readonly service: CustomerEditService) {}

  async execute(request: Request, response: Response, next: NextFunction) {
    try {
      const id: Uuid = new Uuid(request.params.id);
      const { name, document } = request.body;
      const customer = Customer.create(name, document, id.getValue());
      await this.service.execute(customer);
      response.status(200).json({ customer });
    } catch (error) {
      next(error);
    }
  }
}

export class CustomerDelete {
  constructor(readonly service: CustomerDeleteService) {}

  async execute(request: Request, response: Response, next: NextFunction) {
    try {
      const id: Uuid = new Uuid(request.params.id);
      await this.service.execute(id);
      response
        .status(200)
        .send({ message: `Customer with id ${id.getValue()} deleted` });
    } catch (error) {
      next(error);
    }
  }
}
