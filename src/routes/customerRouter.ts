import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";

export function createCustomerRouter(controller: CustomerController): Router {
  const router = Router();

  router.post("/customer", controller.create);
  router.get("/customer", controller.getAll);
  router.get("/customer/:id", controller.getById);
  router.put("/customer/:id", controller.edit);
  router.delete("/customer/:id", controller.delete);

  return router;
}
