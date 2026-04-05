import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository";
import { Cnpj } from "../../domain/value-objects/Cnpj";
import { BadRequestError } from "../../utils/api-errors";

interface CreateCompanyInput {
  name: string;
  document: string;
  phone?: string;
  address?: string;
  userId: string;
}

export class CreateCompanyUseCase {
  constructor(private companyRepo: ICompanyRepository) {}

  async execute({ name, document, phone, address, userId }: CreateCompanyInput) {
    if (!name || !document) {
      throw new BadRequestError("Name and document are required");
    }

    if (!Cnpj.isValid(document)) {
      throw new BadRequestError("Invalid CNPJ");
    }

    return this.companyRepo.create({ name, document, phone, address, userId });
  }
}
