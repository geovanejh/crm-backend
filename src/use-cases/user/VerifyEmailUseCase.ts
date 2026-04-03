import jwt from "jsonwebtoken";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { BadRequestError, UnauthorizedError } from "../../utils/api-errors";
import { env } from "../../config/env";

interface VerifyEmailInput {
  token: string;
}

export class VerifyEmailUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute({ token }: VerifyEmailInput) {
    if (!token) {
      throw new BadRequestError("Token not provided");
    }

    try {
      const decoded = jwt.verify(token, env.jwt.secret);

      if (typeof decoded === "string") {
        throw new UnauthorizedError("Invalid token");
      }

      const user = await this.userRepo.findByEmail(decoded.email);

      if (!user) {
        throw new UnauthorizedError("Invalid token");
      }

      if (user.activated) {
        throw new BadRequestError("Email already verified");
      }

      user.activated = true;
      await this.userRepo.save(user);

      return { message: "Email verified" };
    } catch (error) {
      if (error instanceof BadRequestError || error instanceof UnauthorizedError) {
        throw error;
      }
      throw new UnauthorizedError("Invalid token");
    }
  }
}
