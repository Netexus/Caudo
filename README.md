# Caudo - Employability Vacancy Platform

An employability vacancy platform where **Coders** can apply to job opportunities and **Managers** can post and manage vacancies.

## 🚀 Features

### For Coders
- Browse available job vacancies with **filtering** by Technology and Seniority
- View detailed job information (technologies, salary, location, etc.)
- Apply to vacancies (max 3 active applications)
- **Withdraw** applications if plans change
- Track application status and see visual indicators for applied positions
- View active applications in a dedicated dashboard section

### For Managers
- Create and manage job vacancies
- Include technologies, soft skills, and requirements
- **Validation** for numeric salary input
- **Restricted Location** selection (Medellín, Barranquilla, Bogotá, Cartagena)
- Set maximum applicants per vacancy
- **Delete** vacancies with confirmation modal
- View application metrics and analytics

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | NestJS, TypeORM, Swagger, JWT Auth, API Key Security |
| **Frontend** | Angular 19, TailwindCSS, Standalone Components, Signals |
| **Database** | PostgreSQL via **Supabase** |
| **Deployment** | **Render** (Backend), **Vercel** (Frontend), Docker (Optionally for containerization) |

## 📁 Project Structure

```
/Caudo
├── caudo-backend/       # NestJS API
│   ├── src/
│   │   ├── entities/    # TypeORM entities
│   │   ├── modules/     # Feature modules (auth, vacancies, applications)
│   │   └── common/      # Guards, interceptors, decorators
│   └── Dockerfile
├── caudo-frontend/      # Angular SPA
│   ├── src/app/
│   │   ├── core/        # Services, guards, interceptors
│   │   ├── pages/       # Page components
│   │   └── shared/      # Shared components
│   └── Dockerfile
├── docs/                # Documentation
├── docker-compose.yml   # Container orchestration
└── README.md
```

## ⚡ Quick Start

### Prerequisites
- Node.js 20+
- npm 9+
- Docker & Docker Compose (for containerized deployment)
- Supabase account (for PostgreSQL database)

### 1. Clone and Setup

```bash
cd /Caudo
```

### 2. Backend Setup

```bash
cd caudo-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your Supabase credentials
# DB_HOST=your-project.supabase.co
# DB_PASSWORD=your-password
# JWT_SECRET=your-secret-key

# Start development server
npm run start:dev
```

Backend will be available at `http://localhost:3000`
Swagger docs at `http://localhost:3000/api/docs`

### 3. Frontend Setup

```bash
cd caudo-frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will be available at `http://localhost:4200`

### 4. Docker Deployment

```bash
# From root directory
cp .env.example .env
# Edit .env with production values

# Build and start containers
docker-compose up -d --build
```

Access the app at `http://localhost`

## 📚 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| **NOTE** | All endpoints (except public ones) require `x-api-key` header | Default: `caudo-api-key-2024` | - |
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login | No |
| GET | `/api/auth/profile` | Get current user | Yes |
| GET | `/api/vacancies` | List all vacancies | No |
| POST | `/api/vacancies` | Create vacancy | Admin/Manager |
| GET | `/api/vacancies/:id` | Get vacancy details | No |
| PATCH | `/api/vacancies/:id` | Update vacancy | Admin/Manager |
| DELETE | `/api/vacancies/:id` | Delete vacancy | Admin/Manager |
| POST | `/api/applications` | Apply to vacancy | Coder |
| GET | `/api/applications/my-applications` | Get user's applications | Yes |
| DELETE | `/api/applications/:id` | Withdraw application | Yes |

## 🔒 Business Rules

1. **Application Limit**: Coders can have maximum **3 active applications**
2. **Vacancy Quota**: Vacancies have a `maxApplicants` limit
3. **No Duplicates**: Coders cannot apply twice to the same vacancy
4. **Role-Based Access**: 
   - Only `admin`/`manager` can create vacancies
   - Only `coder` can apply to vacancies

## 🧪 Testing

```bash
# Backend tests
cd caudo-backend
npm run test

# Frontend tests
cd caudo-frontend
npm run test
```

## 📄 License

MIT License - See LICENSE file for details.

---

**Caudo** - Connecting talent with opportunity 🚀
