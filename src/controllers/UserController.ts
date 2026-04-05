import { Request, Response } from "express";
import { CreateUserUseCase } from "../use-cases/user/CreateUserUseCase";
import { LoginUserUseCase } from "../use-cases/user/LoginUserUseCase";
import { VerifyEmailUseCase } from "../use-cases/user/VerifyEmailUseCase";

export class UserController {
  constructor(
    private createUserUC: CreateUserUseCase,
    private loginUserUC: LoginUserUseCase,
    private verifyEmailUC: VerifyEmailUseCase
  ) {}

  create = async (req: Request, res: Response) => {
    const user = await this.createUserUC.execute(req.body);
    return res.status(201).json(user);
  };

  login = async (req: Request, res: Response) => {
    const result = await this.loginUserUC.execute(req.body);
    return res.status(200).json(result);
  };

  getProfile = async (req: Request, res: Response) => {
    return res.json(req.user);
  };

  verifyEmail = async (req: Request, res: Response) => {
    const result = await this.verifyEmailUC.execute({
      token: req.body.token,
    });
    return res.status(200).json(result);
  };
}
