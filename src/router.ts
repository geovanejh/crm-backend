import { Request, Response, Router } from "express";
// import { CustomerRepositoryInMemory } from "./infra/repository/memory/CustomerRepositoryInMemory";
import {
  CustomerCreate,
  CustomerDelete,
  CustomerEdit,
  CustomerGetAll,
  CustomerGetById,
} from "./controller/CustomerController";
import { CustomerRepositoryDatabase } from "./infra/repository/database/CustomerRepositoryDatabase";
import {
  CustomerCreateService,
  CustomerDeleteService,
  CustomerEditService,
  CustomerGetAllService,
  CustomerGetByIdService,
} from "./services/customerService";

const router = Router();

// const repository = new CustomerRepositoryInMemory();
const repository = new CustomerRepositoryDatabase();

const customerCreateService = new CustomerCreateService(repository);
const customerCreate = new CustomerCreate(customerCreateService);

const customerGetAllService = new CustomerGetAllService(repository);
const customerGetAll = new CustomerGetAll(customerGetAllService);

const costumerGetByIdService = new CustomerGetByIdService(repository);
const customerGetById = new CustomerGetById(costumerGetByIdService);

const customerEditService = new CustomerEditService(repository);
const customerEdit = new CustomerEdit(customerEditService);

const customerDeleteService = new CustomerDeleteService(repository);
const customerDelete = new CustomerDelete(customerDeleteService);

router.post("/customer", (request: Request, response: Response) => {
  customerCreate.execute(request, response);
});

router.get("/customer", (request: Request, response: Response) => {
  customerGetAll.execute(request, response);
});

router.get("/customer/:id", (request: Request, response: Response) => {
  customerGetById.execute(request, response);
});

router.put("/customer/:id", (request: Request, response: Response) => {
  customerEdit.execute(request, response);
});

router.delete("/customer/:id", (request: Request, response: Response) => {
  customerDelete.execute(request, response);
});

export { router };
