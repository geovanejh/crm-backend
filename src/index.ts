import "express-async-errors";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { env } from "./config/env";

import { UserRepository } from "./repositories/UserRepository";
import { CustomerRepository } from "./repositories/CustomerRepository";

import { CreateUserUseCase } from "./use-cases/user/CreateUserUseCase";
import { LoginUserUseCase } from "./use-cases/user/LoginUserUseCase";
import { VerifyEmailUseCase } from "./use-cases/user/VerifyEmailUseCase";
import { CreateCustomerUseCase } from "./use-cases/customer/CreateCustomerUseCase";
import { ListCustomersUseCase } from "./use-cases/customer/ListCustomersUseCase";
import { GetCustomerUseCase } from "./use-cases/customer/GetCustomerUseCase";
import { UpdateCustomerUseCase } from "./use-cases/customer/UpdateCustomerUseCase";
import { DeleteCustomerUseCase } from "./use-cases/customer/DeleteCustomerUseCase";

import { UserController } from "./controllers/UserController";
import { CustomerController } from "./controllers/CustomerController";

import { createUserRouter } from "./routes/userRouter";
import { createCustomerRouter } from "./routes/customerRouter";
import { createAuthMiddleware } from "./middlewares/authMiddleware";
import { ErrorHandler } from "./middlewares/error";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Repositories
  const userRepo = new UserRepository();
  const customerRepo = new CustomerRepository();

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

  // Routes
  app.use(createUserRouter(userController, authMiddleware));
  app.use(authMiddleware);
  app.use(createCustomerRouter(customerController));

  app.use(ErrorHandler);

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
});
