import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [guestGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
        canActivate: [guestGuard]
    },
    {
        path: 'coder-dashboard',
        loadComponent: () => import('./pages/coder-dashboard/coder-dashboard.component').then(m => m.CoderDashboardComponent),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['coder'] }
    },
    {
        path: 'manager-dashboard',
        loadComponent: () => import('./pages/manager-dashboard/manager-dashboard.component').then(m => m.ManagerDashboardComponent),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['admin', 'manager'] }
    },
    {
        path: '**',
        redirectTo: ''
    }
];
