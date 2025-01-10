# CRM Backend
 
This project was created for educational purposes to demonstrate the implementation of a CRM backend using modern web technologies.

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeORM**: An ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
- **MySQL**: A relational database management system based on SQL – Structured Query Language.
- **JWT**: JSON Web Tokens for secure authentication.
- **Bcrypt**: Library to help hash passwords.
- **Dotenv**: Module to load environment variables from a `.env` file.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/crm-backend.git
    ```
2. Navigate to the project directory:
    ```sh
    cd crm-backend
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```
2. The server will be running at `http://localhost:3000`.

## API Endpoints

- `GET /api/customers` - Retrieve a list of customers
- `POST /api/customers` - Create a new customer
- `GET /api/customers/:id` - Retrieve a specific customer by ID
- `PUT /api/customers/:id` - Update a specific customer by ID
- `DELETE /api/customers/:id` - Delete a specific customer by ID

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user and return a token
- `POST /api/auth/logout` - Log out a user and invalidate the token
- `GET /api/auth/me` - Retrieve the authenticated user's information