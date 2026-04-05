import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository";
import { Cnpj } from "../../domain/value-objects/Cnpj";
import { BadRequestError, NotFoundError } from "../../utils/api-errors";

interface UpdateCompanyInput {
  name: string;
  document: string;
  phone?: string;
  address?: string;
}

export class UpdateCompanyUseCase {
  constructor(private companyRepo: ICompanyRepository) {}

  async execute(id: string, userId: string, { name, document, phone, address }: UpdateCompanyInput) {
    if (!name || !document) {
      throw new BadRequestError("Name and document are required");
    }

    const company = await this.companyRepo.findByIdAndUser(id, userId);

    if (!company) {
      throw new NotFoundError(`Company with id ${id} not found`);
    }

    if (!Cnpj.isValid(document)) {
      throw new BadRequestError("Invalid CNPJ");
    }

    await this.companyRepo.update(id, { name, document, phone, address });

    return { name, document, phone, address };
  }
}
