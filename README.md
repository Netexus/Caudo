# Caudo - Employability Vacancy Platform

An employability vacancy platform where **Coders** can apply to job opportunities and **Managers** can post and manage vacancies.

## 🚀 Features

### For Coders
- Browse available job vacancies
- View detailed job information (technologies, salary, location, etc.)
- Apply to vacancies (max 3 active applications)
- Track application status

### For Managers
- Create and manage job vacancies
- Include technologies, soft skills, and requirements
- Set maximum applicants per vacancy
- View application metrics and analytics

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | NestJS, TypeORM, PostgreSQL (Supabase), JWT, Swagger |
| **Frontend** | Angular 19, TailwindCSS, Standalone Components |
| **Database** | PostgreSQL via Supabase |
| **Deployment** | Docker, Docker Compose, Nginx |

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
