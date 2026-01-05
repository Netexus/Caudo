# Caudo - Architecture Documentation

## System Overview

Caudo is a full-stack employability platform following a client-server architecture with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Angular Frontend                         │  │
│  │  ┌─────────┐  ┌──────────┐  ┌─────────────────────────┐  │  │
│  │  │ Guards  │  │Interceptor│  │      Components         │  │  │
│  │  └─────────┘  └──────────┘  │  - Navbar               │  │  │
│  │                              │  - Login/Register       │  │  │
│  │  ┌──────────────────────┐   │  - Coder Dashboard      │  │  │
│  │  │      Services        │   │  - Manager Dashboard    │  │  │
│  │  │  - AuthService       │   └─────────────────────────┘  │  │
│  │  │  - VacancyService    │                                 │  │
│  │  │  - ApplicationService│                                 │  │
│  │  └──────────────────────┘                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST + JWT
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SERVER LAYER                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   NestJS Backend                           │  │
│  │                                                            │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │ Auth Module │  │Vacancy Module│  │Application Module│   │  │
│  │  │ - Register  │  │ - CRUD      │  │ - Apply         │   │  │
│  │  │ - Login     │  │ - Metrics   │  │ - Withdraw      │   │  │
│  │  │ - JWT       │  │             │  │ - Business Logic │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐   │  │
│  │  │              Common Layer                           │   │  │
│  │  │  - ResponseInterceptor (standard response format)  │   │  │
│  │  │  - RolesGuard (RBAC)                               │   │  │
│  │  │  - JwtStrategy (authentication)                    │   │  │
│  │  └────────────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ TypeORM + PostgreSQL Protocol
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Supabase PostgreSQL                          │  │
│  │                                                            │  │
│  │  ┌─────────┐  ┌───────────┐  ┌──────────────┐            │  │
│  │  │  users  │  │ vacancies │  │ applications │            │  │
│  │  └─────────┘  └───────────┘  └──────────────┘            │  │
│  │       │             │               │                      │  │
│  │       └─────────────┼───────────────┘                      │  │
│  │                     │                                       │  │
│  │              Relations (FK)                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Model

### User Entity
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | string | User's full name |
| email | string | Unique email |
| password | string | Hashed password |
| role | enum | admin, manager, coder |

### Vacancy Entity
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| title | string | Job title |
| description | text | Job description |
| technologies | string | Required technologies |
| seniority | string | Experience level |
| softSkills | string | Required soft skills |
| location | string | Job location |
| modality | enum | remote, hybrid, onsite |
| salaryRange | string | Salary range |
| company | string | Company name |
| maxApplicants | int | Maximum applicants |
| status | boolean | Active/inactive |

### Application Entity
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| userId | UUID | Foreign key to User |
| vacancyId | UUID | Foreign key to Vacancy |
| appliedAt | Date | Application timestamp |

## Security

- **Authentication**: JWT-based with 24h expiration
- **Password Hashing**: bcrypt with salt rounds
- **Authorization**: Role-based guards (admin, manager, coder)
- **Input Validation**: class-validator decorators
- **CORS**: Configurable allowed origins
