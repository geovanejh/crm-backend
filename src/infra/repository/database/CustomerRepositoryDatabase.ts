import knex, { Knex } from "knex";
import { Customer } from "../../../model/Customer";
import { CustomerRepository } from "../../../model/repository/CustomerRepository";
import { development } from "./KnexConfig";
import { Uuid } from "../../../model/Uuid";

export class CustomerRepositoryDatabase implements CustomerRepository {
  private connection: Knex;

  constructor() {
    this.connection = knex(development);
  }

  async save(customer: Customer): Promise<void> {
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
      throw new Error(`Customer with id ${id.getValue()} not found`);
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
    await this.connection("customer").where({ id: id.getValue() }).delete();
  }
}
