import nodemailer from "nodemailer";
import { env } from "../config/env";

interface EmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
}

const transporter = nodemailer.createTransport({
  host: env.mail.host,
  port: env.mail.port,
  secure: true,
  auth: {
    user: env.mail.user,
    pass: env.mail.pass,
  },
});

export const sendEmail = async ({
  to,
  subject,
  htmlContent,
}: EmailOptions): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: env.mail.from,
      to,
      subject,
      html: htmlContent,
    });

    console.log("E-mail enviado com sucesso:", info.messageId);
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
  }
};
