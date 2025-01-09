import "express-async-errors";
import { ErrorHandler } from "./middlewares/error";
import router from "./routes/router";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  const express = require("express");

  const app = express();
  app.use(express.json());

  app.use(router);
  app.use(ErrorHandler);

  return app.listen(process.env.PORT);
});
