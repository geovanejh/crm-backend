import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    pass: process.env.DB_PASS || "",
    name: process.env.DB_NAME || "crm",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
    expiresIn: "8h" as const,
    emailTokenExpiresIn: "24h" as const,
  },
  mail: {
    host: process.env.MAIL_HOST || "sandbox.smtp.mailtrap.io",
    port: Number(process.env.MAIL_PORT) || 2525,
    user: process.env.MAIL_USER || "",
    pass: process.env.MAIL_PASS || "",
    from: process.env.MAIL_FROM || '"CRM" <noreply@crm.local>',
  },
  appUrl: process.env.APP_URL || "http://localhost:3000",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};
