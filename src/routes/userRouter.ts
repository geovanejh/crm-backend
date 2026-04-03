import { Router } from "express";
import { UserController } from "../controllers/UserController";

export function createUserRouter(
  controller: UserController,
  authMiddleware: ReturnType<typeof import("../middlewares/authMiddleware").createAuthMiddleware>
): Router {
  const router = Router();

  router.post("/user", controller.create);
  router.post("/login", controller.login);
  router.get("/profile", authMiddleware, controller.getProfile);
  router.get("/verify-email", controller.verifyEmail);

  return router;
}
