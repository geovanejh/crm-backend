import "express-async-errors";
import { ErrorHandler } from "./middlewares/error";
import costumerRouter from "./routes/customerRouter";
import userRouter from "./routes/userRouter";
import { AppDataSource } from "./data-source";
import { authMiddleware } from "./middlewares/authMiddleware";

AppDataSource.initialize().then(() => {
  const express = require("express");

  const app = express();
  app.use(express.json());

  app.use(userRouter);

  app.use(authMiddleware);
  app.use(costumerRouter);
  app.use(ErrorHandler);

  return app.listen(process.env.PORT);
});
