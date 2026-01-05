# Deployment Guide

## Backend - Render

**URL**: https://caudo.onrender.com

### Environment Variables en Render:

| Variable | Value |
|----------|-------|
| `DB_HOST` | `aws-0-us-west-2.pooler.supabase.com` |
| `DB_PORT` | `6543` |
| `DB_USERNAME` | `postgres.pvsxxlayfdmucavbdwwo` |
| `DB_PASSWORD` | `your-supabase-password` |
| `DB_NAME` | `postgres` |
| `DB_SSL` | `true` |
| `JWT_SECRET` | `your-secret-key-min-32-chars` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | `https://caudo.vercel.app` |

### Render Settings:
- **Root Directory**: `caudo-backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`

---

## Frontend - Vercel

**URL**: https://caudo.vercel.app

### Vercel Settings:
- **Root Directory**: `caudo-frontend`
- **Framework Preset**: Angular
- **Build Command**: `npm run build`
- **Output Directory**: `dist/caudo-frontend/browser`

---

## API Endpoints

- **Swagger Docs**: https://caudo.onrender.com/api/docs
- **Health Check**: https://caudo.onrender.com/api/health
