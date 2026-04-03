import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { BadRequestError } from "../../utils/api-errors";
import { env } from "../../config/env";

interface LoginInput {
  email: string;
  password: string;
}

export class LoginUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute({ email, password }: LoginInput) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new BadRequestError("Email or password incorrect");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestError("Email or password incorrect");
    }

    const token = jwt.sign({ id: user.id }, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn,
    });

    return { token, email: user.email, activated: user.activated };
  }
}
