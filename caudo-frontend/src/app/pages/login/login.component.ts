import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, RouterLink],
    template: `
    <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-3xl font-bold text-white">C</span>
          </div>
          <h2 class="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p class="text-gray-600 mt-2">Sign in to your Caudo account</p>
        </div>
        
        <div class="bg-white rounded-2xl shadow-xl p-8">
          @if (error()) {
            <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {{ error() }}
            </div>
          }
          
          <form (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                id="email"
                [(ngModel)]="email"
                name="email"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
                required>
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                id="password"
                [(ngModel)]="password"
                name="password"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required>
            </div>
            
            <button 
              type="submit"
              [disabled]="loading()"
              class="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
              @if (loading()) {
                <span>Signing in...</span>
              } @else {
                <span>Sign In</span>
              }
            </button>
          </form>
          
          <p class="mt-6 text-center text-gray-600">
            Don't have an account? 
            <a routerLink="/register" class="text-indigo-600 font-medium hover:underline">Create one</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
    email = '';
    password = '';
    loading = signal(false);
    error = signal<string | null>(null);

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onSubmit(): void {
        this.loading.set(true);
        this.error.set(null);

        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: (response) => {
                this.loading.set(false);
                this.authService.navigateByRole();
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set(err.error?.message || 'Login failed. Please try again.');
            }
        });
    }
}
