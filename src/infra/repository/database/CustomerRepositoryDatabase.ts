import knex, { Knex } from "knex";
import { Customer } from "../../../model/Customer";
import { CustomerRepository } from "../../../model/repository/CustomerRepository";
import { Uuid } from "../../../model/Uuid";
import { NotFoundError } from "../../../utils/api-errors";
import { development } from "./KnexConfig";

export class CustomerRepositoryDatabase implements CustomerRepository {
  private connection: Knex;

  constructor() {
    this.connection = knex(development);
  }

  async create(customer: Customer): Promise<void> {
    await this.connection("customer").insert({
      id: customer.getId().getValue(),
      name: customer.getName(),
      document: customer.getDocument().getValue(),
    });
  }

  async getAll(): Promise<Customer[]> {
    const customersCollection: Array<Customer> = [];

    const customers = await this.connection("customer").select("*");

    customers.forEach((customer, index) => {
      const custom = customers[index];
      const id = custom["id"];
      const name = custom["name"];
      const document = custom["document"];
      customersCollection.push(Customer.create(name, document, id));
    });
    return customersCollection;
  }

  async getById(id: Uuid): Promise<Customer> {
    const customer = await this.connection("customer")
      .select("*")
      .where({ id: id.getValue() })
      .first();

    if (!customer) {
      throw new NotFoundError(`Customer with id ${id.getValue()} not found`);
    }

    return Customer.create(customer.name, customer.document, customer.id);
  }

  async editById(id: Uuid, customer: Customer): Promise<void> {
    await this.connection("customer").where({ id: id.getValue() }).update({
      name: customer.getName(),
      document: customer.getDocument().getValue(),
    });
  }

  async deleteById(id: Uuid): Promise<void> {
    const customer = await this.connection("customer")
      .where({ id: id.getValue() })
      .delete();

    if (!customer) {
      throw new NotFoundError(`Customer with id ${id.getValue()} not found`);
    }
  }
}
