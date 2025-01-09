import { NextFunction, Request, Response, Router } from "express";
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
} from "./services/CustomerService";

const router = Router();

// const repository = new CustomerRepositoryInMemory();
const repository = new CustomerRepositoryDatabase();

const customerCreateService = new CustomerCreateService(repository);
const customerCreate = new CustomerCreate(customerCreateService);

const customerGetAllService = new CustomerGetAllService(repository);
const customerGetAll = new CustomerGetAll(customerGetAllService);

const costumerGetByIdService = new CustomerGetByIdService(repository);
const costumerGetById = new CustomerGetById(costumerGetByIdService);

const customerEditService = new CustomerEditService(repository);
const customerEdit = new CustomerEdit(customerEditService);

const customerDeleteService = new CustomerDeleteService(repository);
const customerDelete = new CustomerDelete(customerDeleteService);

router.post(
  "/customer",
  (request: Request, response: Response, next: NextFunction) => {
    customerCreate.execute(request, response, next);
  }
);

router.get(
  "/customer",
  (request: Request, response: Response, next: NextFunction) => {
    customerGetAll.execute(request, response, next);
  }
);

router.get(
  "/customer/:id",
  (request: Request, response: Response, next: NextFunction) => {
    costumerGetById.execute(request, response, next);
  }
);

router.put(
  "/customer/:id",
  (request: Request, response: Response, next: NextFunction) => {
    customerEdit.execute(request, response, next);
  }
);

router.delete(
  "/customer/:id",
  (request: Request, response: Response, next: NextFunction) => {
    customerDelete.execute(request, response, next);
  }
);

export default router;
