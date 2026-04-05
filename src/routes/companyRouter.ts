import { Router } from "express";
import { CompanyController } from "../controllers/CompanyController";

export function createCompanyRouter(controller: CompanyController): Router {
  const router = Router();

  router.post("/company", controller.create);
  router.get("/company", controller.getAll);
  router.get("/company/:companyId", controller.getById);
  router.put("/company/:companyId", controller.edit);
  router.delete("/company/:companyId", controller.delete);

  return router;
}
