import "express-async-errors";
import { ErrorHandler } from "./middlewares/error";
import costumerRouter from "./routes/customerRouter";
import userRouter from "./routes/userRouter"; // Adjust the path as necessary
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  const express = require("express");

  const app = express();
  app.use(express.json());

  app.use(costumerRouter);
  app.use(userRouter);
  app.use(ErrorHandler);

  return app.listen(process.env.PORT);
});
