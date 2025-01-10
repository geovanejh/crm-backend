import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../utils/api-errors";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";
import { Uuid } from "../entities/Uuid";

type JwtPayload = {
  id: Uuid;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Authorization token is required");
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(
      token,
      process.env.JWT_SECRET ?? ""
    ) as JwtPayload;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestError("Email or password incorrect");
    }

    const { password: _, ...userData } = user;

    req.user = userData;

    next();
  } catch (error) {
    throw new UnauthorizedError("invalid email or password");
  }
};
