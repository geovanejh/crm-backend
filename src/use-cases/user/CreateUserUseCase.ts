import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { BadRequestError } from "../../utils/api-errors";
import { sendEmail } from "../../utils/email-sender";
import { env } from "../../config/env";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export class CreateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute({ name, email, password, phone }: CreateUserInput) {
    const userExists = await this.userRepo.findByEmail(email);

    if (userExists) {
      throw new BadRequestError("Email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const activationToken = this.generateVerificationToken(email);

    const newUser = await this.userRepo.createAndSave({
      name,
      email,
      phone,
      password: hashPassword,
      activationToken,
    });

    this.sendVerificationEmail(email).catch((error) => {
      console.error("Erro ao enviar o e-mail de verificação:", error);
    });

    const { password: _, activationToken: __, ...user } = newUser;
    return user;
  }

  private generateVerificationToken(email: string): string {
    return jwt.sign({ email }, env.jwt.secret, {
      expiresIn: env.jwt.emailTokenExpiresIn,
    });
  }

  private async sendVerificationEmail(userEmail: string): Promise<void> {
    const token = this.generateVerificationToken(userEmail);
    const verificationUrl = `${env.appUrl}/verify-email?token=${token}`;

    const htmlContent = `
      <h1>Confirmação de E-mail</h1>
      <p>Olá,</p>
      <p>Por favor, clique no link abaixo para verificar seu e-mail:</p>
      Link: <a href="${verificationUrl}">Clique aqui!</a>
    `;

    await sendEmail({
      to: userEmail,
      subject: "Confirmação de E-mail",
      htmlContent,
    });
  }
}
