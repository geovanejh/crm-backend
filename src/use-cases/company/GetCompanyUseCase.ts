import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository";
import { NotFoundError } from "../../utils/api-errors";

export class GetCompanyUseCase {
  constructor(private companyRepo: ICompanyRepository) {}

  async execute(id: string, userId: string) {
    const company = await this.companyRepo.findByIdAndUser(id, userId);

    if (!company) {
      throw new NotFoundError(`Company with id ${id} not found`);
    }

    return company;
  }
}
