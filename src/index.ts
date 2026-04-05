import "express-async-errors";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { env } from "./config/env";

import { UserRepository } from "./repositories/userRepository";
import { CustomerRepository } from "./repositories/customerRepository";
import { CompanyRepository } from "./repositories/CompanyRepository";

import { CreateUserUseCase } from "./use-cases/user/CreateUserUseCase";
import { LoginUserUseCase } from "./use-cases/user/LoginUserUseCase";
import { VerifyEmailUseCase } from "./use-cases/user/VerifyEmailUseCase";
import { CreateCustomerUseCase } from "./use-cases/customer/CreateCustomerUseCase";
import { ListCustomersUseCase } from "./use-cases/customer/ListCustomersUseCase";
import { GetCustomerUseCase } from "./use-cases/customer/GetCustomerUseCase";
import { UpdateCustomerUseCase } from "./use-cases/customer/UpdateCustomerUseCase";
import { DeleteCustomerUseCase } from "./use-cases/customer/DeleteCustomerUseCase";
import { CreateCompanyUseCase } from "./use-cases/company/CreateCompanyUseCase";
import { ListCompaniesUseCase } from "./use-cases/company/ListCompaniesUseCase";
import { GetCompanyUseCase } from "./use-cases/company/GetCompanyUseCase";
import { UpdateCompanyUseCase } from "./use-cases/company/UpdateCompanyUseCase";
import { DeleteCompanyUseCase } from "./use-cases/company/DeleteCompanyUseCase";

import { UserController } from "./controllers/UserController";
import { CustomerController } from "./controllers/CustomerController";
import { CompanyController } from "./controllers/CompanyController";

import { createUserRouter } from "./routes/userRouter";
import { createCustomerRouter } from "./routes/customerRouter";
import { createCompanyRouter } from "./routes/companyRouter";
import { createAuthMiddleware } from "./middlewares/authMiddleware";
import { ErrorHandler } from "./middlewares/error";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Repositories
  const userRepo = new UserRepository();
  const customerRepo = new CustomerRepository();
  const companyRepo = new CompanyRepository();

  // Middleware
  const authMiddleware = createAuthMiddleware(userRepo);

  // Use Cases
  const userController = new UserController(
    new CreateUserUseCase(userRepo),
    new LoginUserUseCase(userRepo),
    new VerifyEmailUseCase(userRepo)
  );

  const customerController = new CustomerController(
    new CreateCustomerUseCase(customerRepo),
    new ListCustomersUseCase(customerRepo),
    new GetCustomerUseCase(customerRepo),
    new UpdateCustomerUseCase(customerRepo),
    new DeleteCustomerUseCase(customerRepo)
  );

  const companyController = new CompanyController(
    new CreateCompanyUseCase(companyRepo),
    new ListCompaniesUseCase(companyRepo),
    new GetCompanyUseCase(companyRepo),
    new UpdateCompanyUseCase(companyRepo),
    new DeleteCompanyUseCase(companyRepo)
  );

  // Routes
  app.use(createUserRouter(userController, authMiddleware));
  app.use(authMiddleware);
  app.use(createCompanyRouter(companyController));
  app.use(createCustomerRouter(customerController));

  app.use(ErrorHandler);

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
});
