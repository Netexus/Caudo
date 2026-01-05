# Caudo Backend API

NestJS backend for the Caudo employability platform. Secure, scalable, and built with modern TypeScript.

## 🛠 Tech Stack
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL (via Supabase) with TypeORM
- **Auth**: JWT (Bearer) + custom `x-api-key`
- **Documentation**: Swagger UI
- **Deployment**: Render

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (or valid `DATABASE_URL`)

### Installation

```bash
$ npm install
```

### Environment Variables

Create a `.env` file in the root of `caudo-backend` based on `.env.example`:

```env
# Database
DATABASE_URL="postgres://user:pass@host:port/db"

# JWT Config
JWT_SECRET="your_jwt_secret"
JWT_EXPIRATION="15m"

# API Security
API_KEY="your_secure_api_key_here"

# Server
PORT=3000
CORS_ORIGIN="http://localhost:4200,https://caudo-frontend.vercel.app"
```

### Running the App

```bash
# development
$ npm run start

# watch mode (recommended for dev)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 📚 API Documentation

Once the server is running, visit:
**Authorization**:
1. **Header**: `x-api-key: <YOUR_API_KEY>`
2. **Bearer**: `Authorization: Bearer <JWT_TOKEN>` (obtained from `/api/auth/login`)

## 🐳 Docker

To run with Docker:
```bash
docker build -t caudo-backend .
docker run -p 3000:3000 --env-file .env caudo-backend
```
