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
    host: "smtp.zoho.com",
    port: 465,
    user: process.env.MAIL_USER || "",
    pass: process.env.MAIL_PASS || "",
    from: '"CRM" <crmgetest@zohomail.com>',
  },
  appUrl: process.env.APP_URL || "http://localhost:3000",
};
