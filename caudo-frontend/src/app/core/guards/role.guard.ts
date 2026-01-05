import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const requiredRoles = route.data['roles'] as string[];

    const user = authService.currentUser();

    if (user && requiredRoles.includes(user.role)) {
        return true;
    }

    // Redirect based on current role
    if (user?.role === 'coder') {
        router.navigate(['/coder-dashboard']);
    } else if (user?.role === 'manager' || user?.role === 'admin') {
        router.navigate(['/manager-dashboard']);
    } else {
        router.navigate(['/login']);
    }

    return false;
};
