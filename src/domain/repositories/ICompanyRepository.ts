import { Company } from "../../entities/Company";

export interface ICompanyRepository {
  create(data: {
    name: string;
    document: string;
    phone?: string;
    address?: string;
    userId: string;
  }): Promise<Company>;
  findAllByUser(userId: string): Promise<Company[]>;
  findByIdAndUser(id: string, userId: string): Promise<Company | null>;
  update(id: string, data: Partial<Company>): Promise<void>;
  delete(id: string): Promise<void>;
}
