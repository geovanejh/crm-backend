import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { DocumentFactory } from "../../domain/value-objects/DocumentFactory";
import { BadRequestError, NotFoundError } from "../../utils/api-errors";

interface UpdateCustomerInput {
  name: string;
  document: string;
}

export class UpdateCustomerUseCase {
  constructor(private customerRepo: ICustomerRepository) {}

  async execute(id: string, { name, document }: UpdateCustomerInput) {
    if (!name || !document) {
      throw new BadRequestError("Name and document are required");
    }

    const customer = await this.customerRepo.findById(id);

    if (!customer) {
      throw new NotFoundError(`Customer with id ${id} not found`);
    }

    DocumentFactory.create(document);

    await this.customerRepo.update(id, { name, document });

    return { name, document };
  }
}
