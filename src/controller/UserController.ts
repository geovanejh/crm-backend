import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import { BadRequestError, UnauthorizedError } from "../utils/api-errors";
import jwt from "jsonwebtoken";
import { Uuid } from "../entities/Uuid";
import nodemailer, { Transporter } from "nodemailer";
import { sendEmail } from "../utils/email-sender";

type JwtPayload = {
  id: Uuid;
};

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      throw new BadRequestError("Email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const activationToken = generateVerificationToken(email);

    const newUser = userRepository.create({
      name,
      email,
      phone,
      password: hashPassword,
      activationToken,
    });

    await userRepository.save(newUser);

    const { password: _, activationToken: __, ...user } = newUser;

    sendVerificationEmail(email).catch((error) => {
      console.error("Erro ao enviar o e-mail de verificação:", error);
    });

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestError("Email or password incorrect");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestError("Email or password incorrect");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "8h",
    });

    return res
      .status(200)
      .json({ token, email: user.email, activated: user.activated });
  }

  async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }

  async verifyEmail(req: Request, res: Response) {
    const { token } = req.query;

    if (!token) {
      throw new BadRequestError("Token not provided");
    }

    try {
      const decoded = jwt.verify(token as string, process.env.JWT_SECRET ?? "");

      if (typeof decoded === "string") {
        throw new UnauthorizedError("Invalid token");
      }

      const user = await userRepository.findOneBy({ email: decoded.email });

      if (!user) {
        throw new UnauthorizedError("Invalid token");
      }

      if (user.activated === true) {
        return res.status(400).json({ message: "Email already verified" });
      } else {
        user.activated = true;
      }

      await userRepository.save(user);

      return res.status(200).json({ message: "Email verified" });
    } catch (error) {
      throw new UnauthorizedError("Invalid token");
    }
  }
}

const generateVerificationToken = (email: string) => {
  const secretKey = process.env.JWT_SECRET ?? "";
  const expiresIn = "24h";
  return jwt.sign({ email }, secretKey, { expiresIn });
};

const sendVerificationEmail = async (userEmail: string): Promise<void> => {
  const token = generateVerificationToken(userEmail);
  const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

  const htmlContent = `
      <h1>Confirmação de E-mail</h1>
      <p>Olá,</p>
      <p>Por favor, clique no link abaixo para verificar seu e-mail:</p>
      Link: <a href="${verificationUrl}"> Clique aqui!</a>
  `;

  await sendEmail({
    to: userEmail,
    subject: "Confirmação de E-mail",
    htmlContent,
  });
};
