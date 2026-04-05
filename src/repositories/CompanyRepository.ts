import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Company } from "../entities/Company";
import { ICompanyRepository } from "../domain/repositories/ICompanyRepository";

export class CompanyRepository implements ICompanyRepository {
  private repo: Repository<Company>;

  constructor() {
    this.repo = AppDataSource.getRepository(Company);
  }

  async create(data: {
    name: string;
    document: string;
    phone?: string;
    address?: string;
    userId: string;
  }): Promise<Company> {
    const company = this.repo.create(data);
    return this.repo.save(company);
  }

  async findAllByUser(userId: string): Promise<Company[]> {
    return this.repo.find({ where: { userId } });
  }

  async findByIdAndUser(id: string, userId: string): Promise<Company | null> {
    return this.repo.findOneBy({ id, userId });
  }

  async update(id: string, data: Partial<Company>): Promise<void> {
    await this.repo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
