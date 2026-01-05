# Caudo Frontend

Modern Angular 19 application for the Caudo platform. Built with Signals, Standalone Components, and TailwindCSS.

## 🛠 Tech Stack
- **Framework**: Angular 19
- **Styling**: TailwindCSS
- **State Management**: Angular Signals
- **Architecture**: Standalone Components (No NgModules)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

```bash
$ npm install
```

### Environment Setup

Ensure `src/environments/environment.ts` (dev) or `src/environments/environment.prod.ts` (prod) points to your backend:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // or your Render URL
  apiKey: 'your_api_key'
};
```

### API Key Note
Most requests require an `x-api-key` header. This is handled automatically by the `ApiKeyInterceptor`. Ensure your `apiKey` in environment files matches the backend.

### Development Server

```bash
$ ng serve --open
```
Navigate to `http://localhost:4200/`.

### Build for Production

```bash
$ ng build
```
Artifacts will be stored in `dist/caudo-frontend`.

## 📂 Project Structure

- **Core**: Services, Interceptors, Guards, Models (Singletons).
- **Shared**: Reusable UI components (Navbar, etc).
- **Pages**: Feature views (Home, ManagerDashboard, CoderDashboard, Auth).
