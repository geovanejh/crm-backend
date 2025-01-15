import nodemailer, { Transporter } from "nodemailer";
const { MailtrapTransport } = require("mailtrap");
import "dotenv/config";

const Nodemailer = require("nodemailer");

interface EmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async ({
  to,
  subject,
  htmlContent,
}: EmailOptions): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: '"CRM" <crmgetest@zohomail.com>',
      to,
      subject,
      html: htmlContent,
    });

    console.log("E-mail enviado com sucesso:", info.messageId);
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
  }
};
