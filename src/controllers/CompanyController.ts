import { Request, Response } from "express";
import { CreateCompanyUseCase } from "../use-cases/company/CreateCompanyUseCase";
import { ListCompaniesUseCase } from "../use-cases/company/ListCompaniesUseCase";
import { GetCompanyUseCase } from "../use-cases/company/GetCompanyUseCase";
import { UpdateCompanyUseCase } from "../use-cases/company/UpdateCompanyUseCase";
import { DeleteCompanyUseCase } from "../use-cases/company/DeleteCompanyUseCase";

export class CompanyController {
  constructor(
    private createCompanyUC: CreateCompanyUseCase,
    private listCompaniesUC: ListCompaniesUseCase,
    private getCompanyUC: GetCompanyUseCase,
    private updateCompanyUC: UpdateCompanyUseCase,
    private deleteCompanyUC: DeleteCompanyUseCase
  ) {}

  create = async (req: Request, res: Response) => {
    const company = await this.createCompanyUC.execute({
      ...req.body,
      userId: req.user.id!,
    });
    return res.status(201).json({ company });
  };

  getAll = async (req: Request, res: Response) => {
    console.log("User ID in CompanyController.getAll:", req.user.id);
    const companies = await this.listCompaniesUC.execute(req.user.id!);
    return res.status(200).json({ companies });
  };

  getById = async (req: Request, res: Response) => {
    const company = await this.getCompanyUC.execute(
      req.params.companyId,
      req.user.id!
    );
    return res.status(200).json({ company });
  };

  edit = async (req: Request, res: Response) => {
    const result = await this.updateCompanyUC.execute(
      req.params.companyId,
      req.user.id!,
      req.body
    );
    return res.status(200).json(result);
  };

  delete = async (req: Request, res: Response) => {
    const result = await this.deleteCompanyUC.execute(
      req.params.companyId,
      req.user.id!
    );
    return res.status(200).json(result);
  };
}
