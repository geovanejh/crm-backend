import { Router } from "express";
import { UserController } from "../controller/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();

routes.post("/user", new UserController().create);
routes.post("/login", new UserController().login);
routes.get("/profile", new UserController().getProfile);
routes.get("/verify-email", new UserController().verifyEmail);

export default routes;
