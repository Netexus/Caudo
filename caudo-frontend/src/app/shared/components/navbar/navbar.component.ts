import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink],
    template: `
    <nav class="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span class="text-2xl font-bold text-indigo-600">C</span>
              </div>
              <span class="text-2xl font-bold text-white tracking-tight">Caudo</span>
            </a>
          </div>
          
          <div class="flex items-center space-x-4">
            @if (authService.isAuthenticated()) {
              <span class="text-white/80 text-sm">
                Welcome, <span class="font-semibold text-white">{{ authService.currentUser()?.name }}</span>
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white capitalize">
                {{ authService.currentUser()?.role }}
              </span>
              <button 
                (click)="authService.logout()" 
                class="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 text-sm font-medium">
                Logout
              </button>
            } @else {
              <a routerLink="/login" 
                class="px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium">
                Login
              </a>
              <a routerLink="/register" 
                class="px-4 py-2 rounded-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-200 text-sm font-medium">
                Register
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
