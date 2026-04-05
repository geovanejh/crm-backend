# CRM Backend

API REST para gerenciamento de clientes, empresas e usuarios, construida com **Express + TypeScript + TypeORM + PostgreSQL**, seguindo principios de **Clean Architecture**.

## Funcionalidades

- Cadastro e autenticacao de usuarios (JWT)
- Verificacao de e-mail via link de ativacao
- CRUD de clientes (protegido por autenticacao)
- CRUD de empresas vinculadas ao usuario (multi-tenancy)
- Validacao de documentos (CPF/CNPJ)

## Tecnologias

- **Runtime:** Node.js + TypeScript
- **Framework:** Express
- **ORM:** TypeORM
- **Banco de dados:** PostgreSQL
- **Autenticacao:** JWT (jsonwebtoken) + bcrypt
- **E-mail:** Nodemailer (SMTP Zoho)

## Pre-requisitos

- Node.js >= 18
- PostgreSQL instalado e rodando

## Instalacao

```bash
# Instalar dependencias
npm install

# Configurar variaveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Criar o banco de dados
createdb customer

# Rodar migrations
npm run migration:run

# Iniciar servidor de desenvolvimento
npm run dev
```

## Variaveis de Ambiente

| Variavel      | Descricao                       | Exemplo                |
| ------------- | ------------------------------- | ---------------------- |
| `DB_HOST`     | Host do PostgreSQL              | `localhost`            |
| `DB_PORT`     | Porta do PostgreSQL             | `5432`                 |
| `DB_USER`     | Usuario do banco                | `postgres`             |
| `DB_PASS`     | Senha do banco                  | `senha`                |
| `DB_NAME`     | Nome do banco                   | `customer`             |
| `JWT_SECRET`  | Chave secreta para JWT          | `minha-chave`          |
| `MAIL_USER`   | E-mail para envio (Zoho SMTP)   | `user@zoho.com`        |
| `MAIL_PASS`   | Senha do e-mail                 | `senha`                |
| `PORT`        | Porta do servidor               | `3000`                 |
| `APP_URL`     | URL base da aplicacao (opcional) | `http://localhost:3000` |

## Endpoints

### Publicos

| Metodo | Rota            | Descricao                    |
| ------ | --------------- | ---------------------------- |
| POST   | `/user`         | Cadastrar novo usuario       |
| POST   | `/login`        | Autenticar usuario           |
| GET    | `/verify-email` | Verificar e-mail (via token) |

### Autenticados (Bearer Token)

| Metodo | Rota             | Descricao                |
| ------ | ---------------- | ------------------------ |
| GET    | `/profile`              | Obter perfil do usuario          |
| POST   | `/customer`             | Criar cliente                    |
| GET    | `/customer`             | Listar todos os clientes         |
| GET    | `/customer/:id`         | Buscar cliente por ID            |
| PUT    | `/customer/:id`         | Atualizar cliente                |
| DELETE | `/customer/:id`         | Deletar cliente                  |
| POST   | `/company`              | Criar empresa                    |
| GET    | `/company`              | Listar empresas do usuario       |
| GET    | `/company/:companyId`   | Buscar empresa por ID            |
| PUT    | `/company/:companyId`   | Atualizar empresa                |
| DELETE | `/company/:companyId`   | Deletar empresa                  |

## Arquitetura

O projeto segue **Clean Architecture** com separacao clara de responsabilidades:

```
src/
├── config/            -- Configuracao centralizada (env)
├── domain/            -- Regras de dominio (interfaces, value objects)
├── entities/          -- Entidades TypeORM (User, Customer, Company)
├── repositories/      -- Implementacoes dos repositorios
├── use-cases/         -- Casos de uso (user, customer, company)
├── controllers/       -- Adaptadores HTTP (request/response)
├── routes/            -- Definicao de rotas (factory functions)
├── middlewares/       -- Auth e error handler
├── utils/             -- Erros customizados e envio de e-mail
└── index.ts           -- Composition root
```

### Fluxo de uma requisicao

```
Request -> Route -> Controller -> Use Case -> Repository -> Database
                                     |
                                     └-> Domain (Value Objects, Interfaces)
```

## Scripts

| Comando                      | Descricao                              |
| ---------------------------- | -------------------------------------- |
| `npm run dev`                | Iniciar servidor com hot-reload        |
| `npm run migration:generate` | Gerar migration a partir das entidades |
| `npm run migration:run`      | Executar migrations pendentes          |
| `npx tsc --noEmit`           | Verificar tipos (sem compilar)         |
