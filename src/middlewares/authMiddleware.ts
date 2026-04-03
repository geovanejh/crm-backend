import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/api-errors";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

type JwtPayload = {
  id: string;
};

export function createAuthMiddleware(userRepo: IUserRepository) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedError("Authorization token is required");
    }

    const token = authorization.split(" ")[1];

    try {
      const { id } = jwt.verify(token, env.jwt.secret) as JwtPayload;

      const user = await userRepo.findById(id);

      if (!user) {
        throw new UnauthorizedError("Invalid access token");
      }

      const { password: _, ...userData } = user;
      req.user = userData;

      next();
    } catch (error) {
      throw new UnauthorizedError("Invalid access token");
    }
  };
}
