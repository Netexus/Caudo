import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-caudo-primary shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <a [routerLink]="authService.isAuthenticated() ? (authService.isManager() ? '/manager-dashboard' : '/coder-dashboard') : '/'" 
             class="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="images/caudo-logo.png" 
              alt="Caudo Logo" 
              class="h-10 w-auto"
            >
          </a>

          <!-- Navigation Links -->
          <div class="flex items-center gap-4">
            @if (authService.isAuthenticated()) {
              <!-- User Info -->
              <div class="hidden sm:flex items-center gap-3">
                <span class="text-gray-300">{{ authService.currentUser()?.name }}</span>
                <span class="badge-accent">
                  {{ authService.currentUser()?.role | titlecase }}
                </span>
              </div>
              
              <!-- Dashboard Link -->
              @if (authService.isManager()) {
                <a routerLink="/manager-dashboard" class="text-gray-300 hover:text-caudo-accent transition-colors hidden sm:block">
                  Dashboard
                </a>
              }
              
              <!-- Logout Button -->
              <button 
                (click)="authService.logout()" 
                class="btn-sm bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/50 rounded-lg transition-all"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Salir
              </button>
            } @else {
              <!-- Login/Register Links -->
              <a routerLink="/login" class="text-gray-300 hover:text-white transition-colors">
                Iniciar Sesión
              </a>
              <a routerLink="/register" class="btn-primary btn-sm">
                Registrarse
              </a>
            }
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(public authService: AuthService) { }
}
