import { Request, Response, Router } from "express";
// import { CustomerRepositoryInMemory } from "./infra/repository/memory/CustomerRepositoryInMemory";
import {
  CustomerCreate,
  CustomerDeleteById,
  CustomerEditById,
  CustomerList,
  CustomerListById,
} from "./controller/CustomerController";
import { CustomerRepositoryDatabase } from "./infra/repository/database/CustomerRepositoryDatabase";

const router = Router();

// const repository = new CustomerRepositoryInMemory();
const repository = new CustomerRepositoryDatabase();

const customerCreate = new CustomerCreate(repository);

const customerList = new CustomerList(repository);

const customerListById = new CustomerListById(repository);

const customerEditById = new CustomerEditById(repository);

const customerDeleteById = new CustomerDeleteById(repository);

router.post("/customer", (request: Request, response: Response) => {
  customerCreate.execute(request, response);
});

router.get("/customer", (request: Request, response: Response) => {
  customerList.execute(request, response);
});

router.get("/customer/:id", (request: Request, response: Response) => {
  customerListById.execute(request, response);
});

router.put("/customer/:id", (request: Request, response: Response) => {
  customerEditById.execute(request, response);
});

router.delete("/customer/:id", (request: Request, response: Response) => {
  customerDeleteById.execute(request, response);
});

export { router };
