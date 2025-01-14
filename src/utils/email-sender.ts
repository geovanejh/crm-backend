import nodemailer, { Transporter } from "nodemailer";
const { MailtrapTransport } = require("mailtrap");
import "dotenv/config";

const Nodemailer = require("nodemailer");

// Tipagem para os dados de envio de e-mail
interface EmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
}

// Configuração do transporte com Mailtrap
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "01c8f899606485",
    pass: "7c1115c8ccda55",
  },
});

// Função para enviar o e-mail
export const sendEmail = async ({
  to,
  subject,
  htmlContent,
}: EmailOptions): Promise<void> => {
  try {
    const info = await transport.sendMail({
      from: '"Sua Aplicação" <no-reply@suaaplicacao.com>', // Remetente
      to, // Destinatário
      subject, // Assunto
      html: htmlContent, // Conteúdo HTML
    });

    console.log("E-mail enviado com sucesso:", info.messageId);
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
  }
};
