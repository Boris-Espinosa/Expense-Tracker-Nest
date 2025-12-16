# 💰 Expense Tracker API

[English](#english) | [Español](#español)

---

<a name="english"></a>

## 🇬🇧 English

### 📖 Description

Expense Tracker API is a RESTful backend service built with NestJS for managing personal expenses. It allows users to register, authenticate, and track their spending with features like categorized expenses, filtering by time periods, and detailed financial records.

### 🎯 Problem it Solves

- **Personal Finance Management**: Track and organize all your expenses in one place
- **Category-based Organization**: Classify expenses into categories like Groceries, Leisure, Electronics, Utilities, Clothing, Health, and Others
- **Expense History**: Keep a detailed record of all your spending over time
- **Financial Insights**: Filter and analyze expenses by date ranges to understand spending patterns
- **Secure Data**: User authentication ensures your financial data remains private and secure

### 🛠️ Technologies Used

#### Backend Stack

- **NestJS** - Progressive Node.js framework for building efficient and scalable server-side applications
- **TypeScript** - Strongly typed programming language that builds on JavaScript
- **TypeORM** - Object-Relational Mapping library for TypeScript and JavaScript
- **MySQL** - Relational database management system
- **JWT (@nestjs/jwt)** - JSON Web Tokens for secure authentication
- **Bcrypt** - Password hashing and encryption
- **Class-validator** - Decorator-based validation for DTOs
- **Class-transformer** - Object transformation and serialization
- **RxJS** - Reactive programming library
- **Jest** - Testing framework
- **ESLint + Prettier** - Code linting and formatting

### 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL database (local or remote)
- npm or yarn package manager

### ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/Boris-Espinosa/Expense-Tracker-Nest.git
cd Expense-Tracker-Nest
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_DATABASE=expense_tracker

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=7d

# Application Port
PORT=3000
```

4. Start the development server:

```bash
npm run start:dev
```

### 🚀 Available Scripts

- `npm run start` - Start the production server
- `npm run start:dev` - Start the development server with hot-reload
- `npm run start:debug` - Start the server in debug mode
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage report
- `npm run test:e2e` - Run end-to-end tests

### 📡 API Endpoints

#### Authentication (`/auth`)

| Method | Endpoint    | Description              | Auth Required |
| ------ | ----------- | ------------------------ | ------------- |
| POST   | `/register` | Register a new user      | No            |
| POST   | `/login`    | Login user               | No            |
| GET    | `/profile`  | Get current user profile | Yes           |

#### Users (`/users`)

| Method | Endpoint | Description    | Auth Required |
| ------ | -------- | -------------- | ------------- |
| GET    | `/`      | Get all users  | Yes           |
| GET    | `/:id`   | Get user by ID | Yes           |
| PATCH  | `/:id`   | Update user    | Yes           |
| DELETE | `/:id`   | Delete user    | Yes           |

#### Expenses (`/expenses`)

| Method | Endpoint | Description                     | Auth Required |
| ------ | -------- | ------------------------------- | ------------- |
| POST   | `/`      | Create a new expense            | Yes           |
| GET    | `/`      | Get all expenses (with filters) | Yes           |
| GET    | `/:id`   | Get expense by ID               | Yes           |
| PATCH  | `/:id`   | Update expense                  | Yes           |
| DELETE | `/:id`   | Delete expense                  | Yes           |

**Query Parameters for GET /expenses:**

- `startDate` - Filter expenses from this date (YYYY-MM-DD)
- `endDate` - Filter expenses until this date (YYYY-MM-DD)
- `category` - Filter by expense category

### 📝 API Request Examples

#### Register a User

```bash
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login

```bash
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Create an Expense

```bash
POST /expenses
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Weekly Groceries",
  "amount": 85.50,
  "category": "Groceries"
}
```

#### Get Filtered Expenses

```bash
GET /expenses?startDate=2025-01-01&endDate=2025-01-31&category=Groceries
Authorization: Bearer <your_jwt_token>
```

#### Update an Expense

```bash
PATCH /expenses/1
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "amount": 95.00,
  "title": "Weekly Groceries - Updated"
}
```

#### Delete an Expense

```bash
DELETE /expenses/1
Authorization: Bearer <your_jwt_token>
```

### 🗂️ Project Structure

```
expense-tracker-nest/
├── src/
│   ├── main.ts                      # Application entry point
│   ├── app.module.ts                # Root module
│   ├── app.controller.ts            # Root controller
│   ├── app.service.ts               # Root service
│   ├── auth/
│   │   ├── auth.module.ts           # Authentication module
│   │   ├── auth.controller.ts       # Auth endpoints
│   │   ├── auth.service.ts          # Auth business logic
│   │   └── auth.guard.ts            # JWT authentication guard
│   ├── users/
│   │   ├── users.module.ts          # Users module
│   │   ├── users.controller.ts      # User endpoints
│   │   ├── users.service.ts         # User business logic
│   │   ├── entities/
│   │   │   └── user.entity.ts       # User entity/model
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts   # DTO for creating users
│   │   │   └── update-user.dto.ts   # DTO for updating users
│   │   └── client-user.interface.ts # User interface
│   └── expenses/
│       ├── expenses.module.ts       # Expenses module
│       ├── expenses.controller.ts   # Expense endpoints
│       ├── expenses.service.ts      # Expense business logic
│       ├── categories.ts            # Valid expense categories
│       ├── entities/
│       │   └── expense.entity.ts    # Expense entity/model
│       └── dto/
│           ├── create-expense.dto.ts # DTO for creating expenses
│           └── update-expense.dto.ts # DTO for updating expenses
├── test/
│   ├── app.e2e-spec.ts              # End-to-end tests
│   └── jest-e2e.json                # E2E test configuration
├── .env                             # Environment variables
├── nest-cli.json                    # NestJS CLI configuration
├── tsconfig.json                    # TypeScript configuration
├── eslint.config.mjs                # ESLint configuration
└── package.json                     # Project dependencies
```

### 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login or registration, a token is returned that must be included in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

Token expiration can be configured in the `.env` file (default: 7 days).

### 📦 Data Models

#### User Entity

```typescript
{
  id: number (auto-generated),
  username: string (required, unique),
  email: string (required, unique),
  password: string (required, hashed),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated),
  expenses: Expense[] (one-to-many relationship)
}
```

#### Expense Entity

```typescript
{
  id: number (auto-generated),
  title: string (required),
  amount: number (required),
  category: string (required, validated),
  date: Date (default: current date),
  user: User (many-to-one relationship),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

#### Valid Expense Categories

- Groceries
- Leisure
- Electronics
- Utilities
- Clothing
- Health
- Others

### 🔧 Features

- ✅ User registration and authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ RESTful API architecture
- ✅ TypeORM for database operations
- ✅ Category-based expense classification
- ✅ Date range filtering for expenses
- ✅ DTO validation with class-validator
- ✅ Modular architecture with NestJS
- ✅ TypeScript for type safety
- ✅ Unit and E2E testing setup
- ✅ Code quality tools (ESLint + Prettier)
- ✅ Protected routes with authentication guards

### 🚀 Deployment

To deploy this application:

1. Build the project:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start:prod
```

Make sure to set up your production environment variables and database before deployment.

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 License

UNLICENSED

### 👤 Author

Boris Espinosa

---

<a name="español"></a>

## 🇪🇸 Español

### 📖 Descripción

Expense Tracker API es un servicio backend RESTful construido con NestJS para gestionar gastos personales. Permite a los usuarios registrarse, autenticarse y rastrear sus gastos con características como gastos categorizados, filtrado por períodos de tiempo y registros financieros detallados.

### 🎯 Problema que Resuelve

- **Gestión de Finanzas Personales**: Rastrea y organiza todos tus gastos en un solo lugar
- **Organización por Categorías**: Clasifica gastos en categorías como Comestibles, Ocio, Electrónica, Servicios, Ropa, Salud y Otros
- **Historial de Gastos**: Mantén un registro detallado de todos tus gastos a lo largo del tiempo
- **Análisis Financiero**: Filtra y analiza gastos por rangos de fechas para entender patrones de gasto
- **Datos Seguros**: La autenticación de usuarios asegura que tus datos financieros permanezcan privados y seguros

### 🛠️ Tecnologías Utilizadas

#### Stack Backend

- **NestJS** - Framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes y escalables
- **TypeScript** - Lenguaje de programación fuertemente tipado que se construye sobre JavaScript
- **TypeORM** - Biblioteca de mapeo objeto-relacional para TypeScript y JavaScript
- **MySQL** - Sistema de gestión de bases de datos relacionales
- **JWT (@nestjs/jwt)** - Tokens Web JSON para autenticación segura
- **Bcrypt** - Cifrado y hash de contraseñas
- **Class-validator** - Validación basada en decoradores para DTOs
- **Class-transformer** - Transformación y serialización de objetos
- **RxJS** - Biblioteca de programación reactiva
- **Jest** - Framework de testing
- **ESLint + Prettier** - Linting y formateo de código

### 📋 Prerequisitos

- Node.js (v16 o superior)
- Base de datos MySQL (local o remota)
- Gestor de paquetes npm o yarn

### ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Boris-Espinosa/Expense-Tracker-Nest.git
cd Expense-Tracker-Nest
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en el directorio raíz:

```env
# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=tu_usuario_de_base_de_datos
DB_PASSWORD=tu_contraseña_de_base_de_datos
DB_DATABASE=expense_tracker

# Configuración JWT
JWT_SECRET=tu_clave_secreta_jwt
JWT_EXPIRATION=7d

# Puerto de la Aplicación
PORT=3000
```

4. Inicia el servidor de desarrollo:

```bash
npm run start:dev
```

### 🚀 Scripts Disponibles

- `npm run start` - Inicia el servidor de producción
- `npm run start:dev` - Inicia el servidor de desarrollo con recarga automática
- `npm run start:debug` - Inicia el servidor en modo debug
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta ESLint para verificar la calidad del código
- `npm run format` - Formatea el código con Prettier
- `npm run test` - Ejecuta las pruebas unitarias
- `npm run test:watch` - Ejecuta las pruebas en modo watch
- `npm run test:cov` - Ejecuta las pruebas con reporte de cobertura
- `npm run test:e2e` - Ejecuta las pruebas end-to-end

### 📡 Endpoints de la API

#### Autenticación (`/auth`)

| Método | Endpoint    | Descripción                       | Requiere Auth |
| ------ | ----------- | --------------------------------- | ------------- |
| POST   | `/register` | Registrar un nuevo usuario        | No            |
| POST   | `/login`    | Iniciar sesión                    | No            |
| GET    | `/profile`  | Obtener perfil del usuario actual | Sí            |

#### Usuarios (`/users`)

| Método | Endpoint | Descripción                | Requiere Auth |
| ------ | -------- | -------------------------- | ------------- |
| GET    | `/`      | Obtener todos los usuarios | Sí            |
| GET    | `/:id`   | Obtener usuario por ID     | Sí            |
| PATCH  | `/:id`   | Actualizar usuario         | Sí            |
| DELETE | `/:id`   | Eliminar usuario           | Sí            |

#### Gastos (`/expenses`)

| Método | Endpoint | Descripción                            | Requiere Auth |
| ------ | -------- | -------------------------------------- | ------------- |
| POST   | `/`      | Crear un nuevo gasto                   | Sí            |
| GET    | `/`      | Obtener todos los gastos (con filtros) | Sí            |
| GET    | `/:id`   | Obtener gasto por ID                   | Sí            |
| PATCH  | `/:id`   | Actualizar gasto                       | Sí            |
| DELETE | `/:id`   | Eliminar gasto                         | Sí            |

**Parámetros de consulta para GET /expenses:**

- `startDate` - Filtrar gastos desde esta fecha (YYYY-MM-DD)
- `endDate` - Filtrar gastos hasta esta fecha (YYYY-MM-DD)
- `category` - Filtrar por categoría de gasto

### 📝 Ejemplos de Peticiones a la API

#### Registrar un Usuario

```bash
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Iniciar Sesión

```bash
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securePassword123"
}
```

**Respuesta:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Crear un Gasto

```bash
POST /expenses
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json

{
  "title": "Compras Semanales",
  "amount": 85.50,
  "category": "Groceries"
}
```

#### Obtener Gastos Filtrados

```bash
GET /expenses?startDate=2025-01-01&endDate=2025-01-31&category=Groceries
Authorization: Bearer <tu_token_jwt>
```

#### Actualizar un Gasto

```bash
PATCH /expenses/1
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json

{
  "amount": 95.00,
  "title": "Compras Semanales - Actualizado"
}
```

#### Eliminar un Gasto

```bash
DELETE /expenses/1
Authorization: Bearer <tu_token_jwt>
```

### 🗂️ Estructura del Proyecto

```
expense-tracker-nest/
├── src/
│   ├── main.ts                      # Punto de entrada de la aplicación
│   ├── app.module.ts                # Módulo raíz
│   ├── app.controller.ts            # Controlador raíz
│   ├── app.service.ts               # Servicio raíz
│   ├── auth/
│   │   ├── auth.module.ts           # Módulo de autenticación
│   │   ├── auth.controller.ts       # Endpoints de autenticación
│   │   ├── auth.service.ts          # Lógica de negocio de auth
│   │   └── auth.guard.ts            # Guard de autenticación JWT
│   ├── users/
│   │   ├── users.module.ts          # Módulo de usuarios
│   │   ├── users.controller.ts      # Endpoints de usuarios
│   │   ├── users.service.ts         # Lógica de negocio de usuarios
│   │   ├── entities/
│   │   │   └── user.entity.ts       # Entidad/modelo de usuario
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts   # DTO para crear usuarios
│   │   │   └── update-user.dto.ts   # DTO para actualizar usuarios
│   │   └── client-user.interface.ts # Interfaz de usuario
│   └── expenses/
│       ├── expenses.module.ts       # Módulo de gastos
│       ├── expenses.controller.ts   # Endpoints de gastos
│       ├── expenses.service.ts      # Lógica de negocio de gastos
│       ├── categories.ts            # Categorías válidas de gastos
│       ├── entities/
│       │   └── expense.entity.ts    # Entidad/modelo de gasto
│       └── dto/
│           ├── create-expense.dto.ts # DTO para crear gastos
│           └── update-expense.dto.ts # DTO para actualizar gastos
├── test/
│   ├── app.e2e-spec.ts              # Pruebas end-to-end
│   └── jest-e2e.json                # Configuración de pruebas E2E
├── .env                             # Variables de entorno
├── nest-cli.json                    # Configuración de NestJS CLI
├── tsconfig.json                    # Configuración de TypeScript
├── eslint.config.mjs                # Configuración de ESLint
└── package.json                     # Dependencias del proyecto
```

### 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Después de un inicio de sesión o registro exitoso, se devuelve un token que debe incluirse en el encabezado `Authorization` para rutas protegidas:

```
Authorization: Bearer <tu_token_jwt>
```

La expiración del token se puede configurar en el archivo `.env` (por defecto: 7 días).

### 📦 Modelos de Datos

#### Entidad de Usuario

```typescript
{
  id: number (auto-generado),
  username: string (requerido, único),
  email: string (requerido, único),
  password: string (requerido, hasheado),
  createdAt: Date (auto-generado),
  updatedAt: Date (auto-generado),
  expenses: Expense[] (relación uno-a-muchos)
}
```

#### Entidad de Gasto

```typescript
{
  id: number (auto-generado),
  title: string (requerido),
  amount: number (requerido),
  category: string (requerido, validado),
  date: Date (por defecto: fecha actual),
  user: User (relación muchos-a-uno),
  createdAt: Date (auto-generado),
  updatedAt: Date (auto-generado)
}
```

#### Categorías Válidas de Gastos

- Groceries (Comestibles)
- Leisure (Ocio)
- Electronics (Electrónica)
- Utilities (Servicios)
- Clothing (Ropa)
- Health (Salud)
- Others (Otros)

### 🔧 Características

- ✅ Registro y autenticación de usuarios con JWT
- ✅ Hash de contraseñas con bcrypt
- ✅ Arquitectura API RESTful
- ✅ TypeORM para operaciones de base de datos
- ✅ Clasificación de gastos por categorías
- ✅ Filtrado por rango de fechas para gastos
- ✅ Validación de DTOs con class-validator
- ✅ Arquitectura modular con NestJS
- ✅ TypeScript para seguridad de tipos
- ✅ Configuración de pruebas unitarias y E2E
- ✅ Herramientas de calidad de código (ESLint + Prettier)
- ✅ Rutas protegidas con guards de autenticación

### 🚀 Despliegue

Para desplegar esta aplicación:

1. Construye el proyecto:

```bash
npm run build
```

2. Inicia el servidor de producción:

```bash
npm run start:prod
```

Asegúrate de configurar tus variables de entorno de producción y base de datos antes del despliegue.

### 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, siéntete libre de enviar un Pull Request.

1. Haz un Fork del proyecto
2. Crea tu rama de característica (`git checkout -b feature/CaracteristicaIncreible`)
3. Haz commit de tus cambios (`git commit -m 'Agrega una CaracteristicaIncreible'`)
4. Haz push a la rama (`git push origin feature/CaracteristicaIncreible`)
5. Abre un Pull Request

### 📄 Licencia

UNLICENSED

### 👤 Autor

Boris Espinosa
