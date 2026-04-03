import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { NotFoundError } from "../../utils/api-errors";

export class DeleteCustomerUseCase {
  constructor(private customerRepo: ICustomerRepository) {}

  async execute(id: string) {
    const customer = await this.customerRepo.findById(id);

    if (!customer) {
      throw new NotFoundError(`Customer with id ${id} not found`);
    }

    await this.customerRepo.delete(id);

    return { message: `Customer with id ${id} deleted` };
  }
}
