import { Request, Response } from "express";
import { customerRepository } from "../repositories/customerRepository";
import { BadRequestError, NotFoundError } from "../utils/api-errors";

export class CustomerController {
  async create(request: Request, response: Response) {
    const { name, document } = request.body;
    const customer = customerRepository.create({ name, document });

    if (!customer.name || !customer.document) {
      throw new BadRequestError("Name and document are required");
    }

    await customerRepository.save(customer);
    response.status(201).json({ customer });
  }

  async getAll(request: Request, response: Response) {
    const customers = await customerRepository.find();
    response.status(200).json({ customers });
  }

  async getById(request: Request, response: Response) {
    const id = request.params.id;

    const customer = await customerRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundError(`Customer with id ${id} not found`);
    }

    response.status(200).json({ customer });
  }

  async edit(request: Request, response: Response) {
    if (!request.body.name || !request.body.document) {
      throw new BadRequestError("Name and document are required");
    }

    const id = request.params.id;
    const customer = await customerRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundError(`Customer with id ${id} not found`);
    }

    const test = await customerRepository.update(id, { ...request.body });

    response.status(200).json({ ...request.body });
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;

    const customer = await customerRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundError(`Customer with id ${id} not found`);
    }

    await customerRepository.delete(id);

    response.status(200).json({ message: `Customer with id ${id} deleted` });
  }
}
