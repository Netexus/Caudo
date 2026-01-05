# Deployment Guide

## Backend - Railway

### Steps:
1. Go to [Railway](https://railway.app) and create a new project
2. Select "Deploy from GitHub repo"
3. Choose the `Netexus/Caudo` repository
4. **IMPORTANT**: Set the root directory to `caudo-backend`
5. Add the following environment variables:

| Variable | Value |
|----------|-------|
| `DB_HOST` | `aws-0-us-west-2.pooler.supabase.com` |
| `DB_PORT` | `6543` |
| `DB_USERNAME` | `postgres.pvsxxlayfdmucavbdwwo` |
| `DB_PASSWORD` | `your-supabase-password` |
| `DB_NAME` | `postgres` |
| `DB_SSL` | `true` |
| `JWT_SECRET` | `your-long-secret-key-min-32-chars` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | `https://your-vercel-app.vercel.app` |

6. Railway will auto-deploy on push to main

### Get your Railway URL:
After deploy, Railway will give you a URL like:
`https://caudo-backend-production.up.railway.app`

---

## Frontend - Vercel

### Steps:
1. Go to [Vercel](https://vercel.com) and create a new project
2. Import the `Netexus/Caudo` repository
3. Configure:
   - **Framework Preset**: Angular
   - **Root Directory**: `caudo-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/caudo-frontend/browser`

4. **IMPORTANT**: Before deploying, update the API URL:
   - Edit `caudo-frontend/src/environments/environment.prod.ts`
   - Replace `YOUR-RAILWAY-APP` with your actual Railway URL

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://YOUR-RAILWAY-URL.railway.app/api'
};
```

5. Commit and push the change
6. Vercel will auto-deploy

---

## Post-Deployment Checklist

- [ ] Backend deployed to Railway
- [ ] Update `CORS_ORIGIN` in Railway with Vercel URL
- [ ] Update `environment.prod.ts` with Railway URL
- [ ] Frontend deployed to Vercel
- [ ] Test login/register flow
- [ ] Test vacancy creation (manager)
- [ ] Test application (coder)
