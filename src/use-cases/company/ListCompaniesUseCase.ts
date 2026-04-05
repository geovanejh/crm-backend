import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository";

export class ListCompaniesUseCase {
  constructor(private companyRepo: ICompanyRepository) {}

  async execute(userId: string) {
    console.log("User ID in ListCompaniesUseCase.execute:", userId);
    try {
      return this.companyRepo.findAllByUser(userId);

    } catch (error) {
      console.error("Error in ListCompaniesUseCase.execute:", error);
      throw new Error("Failed to list companies");
    }
  }
}
