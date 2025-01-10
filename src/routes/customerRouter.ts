import { Router } from "express";
import { CustomerController } from "../controller/CustomerController";

const costumerRouter = Router();

costumerRouter.post("/customer", new CustomerController().create);

costumerRouter.get("/customer", new CustomerController().getAll);

costumerRouter.get("/customer/:id", new CustomerController().getById);

costumerRouter.put("/customer/:id", new CustomerController().edit);

costumerRouter.delete("/customer/:id", new CustomerController().delete);

export default costumerRouter;
