import { Request, Response } from "express";
import { CreateCustomerUseCase } from "../use-cases/customer/CreateCustomerUseCase";
import { ListCustomersUseCase } from "../use-cases/customer/ListCustomersUseCase";
import { GetCustomerUseCase } from "../use-cases/customer/GetCustomerUseCase";
import { UpdateCustomerUseCase } from "../use-cases/customer/UpdateCustomerUseCase";
import { DeleteCustomerUseCase } from "../use-cases/customer/DeleteCustomerUseCase";

export class CustomerController {
  constructor(
    private createCustomerUC: CreateCustomerUseCase,
    private listCustomersUC: ListCustomersUseCase,
    private getCustomerUC: GetCustomerUseCase,
    private updateCustomerUC: UpdateCustomerUseCase,
    private deleteCustomerUC: DeleteCustomerUseCase
  ) {}

  create = async (req: Request, res: Response) => {
    const customer = await this.createCustomerUC.execute(req.body);
    return res.status(201).json({ customer });
  };

  getAll = async (req: Request, res: Response) => {
    const customers = await this.listCustomersUC.execute();
    return res.status(200).json({ customers });
  };

  getById = async (req: Request, res: Response) => {
    const customer = await this.getCustomerUC.execute(req.params.id);
    return res.status(200).json({ customer });
  };

  edit = async (req: Request, res: Response) => {
    const result = await this.updateCustomerUC.execute(req.params.id, req.body);
    return res.status(200).json(result);
  };

  delete = async (req: Request, res: Response) => {
    const result = await this.deleteCustomerUC.execute(req.params.id);
    return res.status(200).json(result);
  };
}
