import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
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
          <h2 class="text-3xl font-bold text-caudo-primary">Crea tu cuenta</h2>
          <p class="text-gray-600 mt-2">Únete a la plataforma Caudo</p>
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
          
          @if (success()) {
            <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
              <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              {{ success() }}
            </div>
          }
          
          <form (ngSubmit)="onSubmit()" class="space-y-5">
            <div>
              <label for="name" class="input-label">Nombre completo</label>
              <input 
                type="text" 
                id="name"
                [(ngModel)]="name"
                name="name"
                class="input"
                placeholder="Juan Pérez"
                required>
            </div>
            
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
                placeholder="Mínimo 6 caracteres"
                minlength="6"
                required>
            </div>
            
            <div>
              <label for="role" class="input-label">Quiero</label>
              <div class="grid grid-cols-2 gap-3 mt-2">
                <button 
                  type="button"
                  (click)="role = 'coder'"
                  [class]="role === 'coder' 
                    ? 'p-4 rounded-lg border-2 border-caudo-accent bg-caudo-accent/10 text-caudo-primary transition-all' 
                    : 'p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 text-gray-600 transition-all'">
                  <svg class="w-8 h-8 mx-auto mb-2" [class.text-caudo-accent]="role === 'coder'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                  <span class="block font-semibold">Aplicar a trabajos</span>
                  <span class="text-xs text-gray-500">Coder</span>
                </button>
                
                <button 
                  type="button"
                  (click)="role = 'manager'"
                  [class]="role === 'manager' 
                    ? 'p-4 rounded-lg border-2 border-caudo-accent bg-caudo-accent/10 text-caudo-primary transition-all' 
                    : 'p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 text-gray-600 transition-all'">
                  <svg class="w-8 h-8 mx-auto mb-2" [class.text-caudo-accent]="role === 'manager'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  <span class="block font-semibold">Publicar vacantes</span>
                  <span class="text-xs text-gray-500">Manager</span>
                </button>
              </div>
            </div>
            
            <button 
              type="submit"
              [disabled]="loading()"
              class="w-full btn-primary btn-lg mt-2">
              @if (loading()) {
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Creando cuenta...
              } @else {
                Crear Cuenta
              }
            </button>
          </form>
          
          <div class="mt-6 text-center">
            <p class="text-gray-600">
              ¿Ya tienes cuenta? 
              <a routerLink="/login" class="text-caudo-accent font-semibold hover:underline">Inicia sesión</a>
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
export class RegisterComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  role: 'coder' | 'manager' = 'coder';
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Check for role query param
    const roleParam = this.route.snapshot.queryParamMap.get('role');
    if (roleParam === 'manager') {
      this.role = 'manager';
    }
  }

  onSubmit(): void {
    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.success.set('¡Cuenta creada! Redirigiendo al login...');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Error al crear cuenta. Intenta de nuevo.');
      }
    });
  }
}
