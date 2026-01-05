import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-caudo-bg flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full">
        <!-- Header -->
        <div class="text-center mb-8">
          <a routerLink="/">
            <img 
              src="images/caudo-logo.png" 
              alt="Caudo Logo" 
              class="h-16 mx-auto mb-6"
            >
          </a>
          <h2 class="text-3xl font-bold text-caudo-primary">Bienvenido de vuelta</h2>
          <p class="text-gray-600 mt-2">Inicia sesión en tu cuenta de Caudo</p>
        </div>
        
        <!-- Form Card -->
        <div class="card p-8">
          @if (error()) {
            <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
              <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              {{ error() }}
            </div>
          }
          
          <form (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="email" class="input-label">Correo electrónico</label>
              <input 
                type="email" 
                id="email"
                [(ngModel)]="email"
                name="email"
                class="input"
                placeholder="tu@email.com"
                required>
            </div>
            
            <div>
              <label for="password" class="input-label">Contraseña</label>
              <input 
                type="password" 
                id="password"
                [(ngModel)]="password"
                name="password"
                class="input"
                placeholder="••••••••"
                required>
            </div>
            
            <button 
              type="submit"
              [disabled]="loading()"
              class="w-full btn-primary btn-lg">
              @if (loading()) {
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Iniciando sesión...
              } @else {
                Iniciar Sesión
              }
            </button>
          </form>
          
          <div class="mt-6 text-center">
            <p class="text-gray-600">
              ¿No tienes cuenta? 
              <a routerLink="/register" class="text-caudo-accent font-semibold hover:underline">Regístrate</a>
            </p>
          </div>
        </div>
        
        <!-- Back to Home -->
        <div class="mt-6 text-center">
          <a routerLink="/" class="text-gray-500 hover:text-caudo-primary transition-colors inline-flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Volver al inicio
          </a>
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
        this.error.set(err.error?.message || 'Error al iniciar sesión. Intenta de nuevo.');
      }
    });
  }
}
