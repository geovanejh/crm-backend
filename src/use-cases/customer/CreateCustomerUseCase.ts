import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { DocumentFactory } from "../../domain/value-objects/DocumentFactory";
import { BadRequestError } from "../../utils/api-errors";

interface CreateCustomerInput {
  name: string;
  document: string;
}

export class CreateCustomerUseCase {
  constructor(private customerRepo: ICustomerRepository) {}

  async execute({ name, document }: CreateCustomerInput) {
    if (!name || !document) {
      throw new BadRequestError("Name and document are required");
    }

    DocumentFactory.create(document);

    return this.customerRepo.create({ name, document });
  }
}
