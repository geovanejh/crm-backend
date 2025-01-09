import "express-async-errors";
import { ErrorHandler } from "./middlewares/error";
import router from "./router";

const express = require("express");

const app = express();

app.use(express.json());

app.use(router);

app.use(ErrorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
