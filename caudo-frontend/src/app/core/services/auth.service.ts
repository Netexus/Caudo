import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = environment.apiUrl;
    private readonly TOKEN_KEY = 'caudo_token';
    private readonly USER_KEY = 'caudo_user';

    private userSignal = signal<User | null>(this.getStoredUser());

    currentUser = computed(() => this.userSignal());
    isAuthenticated = computed(() => !!this.userSignal());
    isManager = computed(() => {
        const user = this.userSignal();
        return user?.role === 'manager' || user?.role === 'admin';
    });
    isCoder = computed(() => this.userSignal()?.role === 'coder');

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    private getStoredUser(): User | null {
        const userStr = localStorage.getItem(this.USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    register(data: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/auth/register`, data).pipe(
            catchError((error) => throwError(() => error))
        );
    }

    login(data: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, data).pipe(
            tap((response) => {
                if (response.success && response.data) {
                    localStorage.setItem(this.TOKEN_KEY, response.data.accessToken);
                    localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user));
                    this.userSignal.set(response.data.user);
                }
            }),
            catchError((error) => throwError(() => error))
        );
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        this.userSignal.set(null);
        this.router.navigate(['/login']);
    }

    navigateByRole(): void {
        const user = this.userSignal();
        if (user?.role === 'coder') {
            this.router.navigate(['/coder-dashboard']);
        } else if (user?.role === 'manager' || user?.role === 'admin') {
            this.router.navigate(['/manager-dashboard']);
        }
    }
}
