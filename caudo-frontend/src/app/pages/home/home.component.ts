import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  template: `
    <div class="min-h-screen bg-caudo-bg">
      <app-navbar></app-navbar>
      
      <!-- Hero Section -->
      <section class="relative bg-gradient-caudo overflow-hidden">
        <!-- Decorative Circles -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div class="text-center animate-fade-in">
            <!-- Logo -->
            <img 
              src="images/caudo-logo.png" 
              alt="Caudo Logo" 
              class="h-20 mx-auto mb-8 drop-shadow-lg"
            >
            
            <!-- Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Connecting <span class="text-caudo-accent">Tech Talent</span><br>
              with the Future
            </h1>
            
            <!-- Subtitle -->
            <p class="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
              The exclusive platform for Coders looking for their next big opportunity.
            </p>
            
            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              @if (authService.isAuthenticated()) {
                <button (click)="navigateToDashboard()" class="btn-primary btn-lg">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  Go to Dashboard
                </button>
              } @else {
                <a routerLink="/register" class="btn-primary btn-lg">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  Browse Vacancies
                </a>
                <a routerLink="/login" class="btn-outline-light btn-lg">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                  </svg>
                  Log In
                </a>
              }
            </div>
          </div>
        </div>
        
        <!-- Wave Divider -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8FAFC"/>
          </svg>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-caudo-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-caudo-primary mb-4">
              Why choose Caudo?
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              A platform designed to connect the best tech talent with the best opportunities.
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Feature 1: Coders -->
            <div class="card p-8 text-center">
              <div class="w-16 h-16 bg-caudo-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-caudo-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-caudo-primary mb-3">Smart Application</h3>
              <p class="text-gray-600">
                Apply only to what interests you. Limit of 3 active applications to ensure quality and focus.
              </p>
            </div>
            
            <!-- Feature 2: Companies (Verified) -->
            <div class="card p-8 text-center">
              <div class="w-16 h-16 bg-caudo-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-caudo-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-caudo-primary mb-3">Verified Companies</h3>
              <p class="text-gray-600">
                Access vacancies from leading tech companies validated by our team.
              </p>
            </div>
            
            <!-- Feature 3: Tech -->
            <div class="card p-8 text-center">
              <div class="w-16 h-16 bg-caudo-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-caudo-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-caudo-primary mb-3">Modern Stack</h3>
              <p class="text-gray-600">
                Platform built with the latest technologies for a fast and reliable experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-caudo-primary py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold text-white mb-4">
            Ready to take the next step?
          </h2>
          <p class="text-xl text-gray-300 mb-8">
            Join the community of tech professionals who already trust Caudo.
          </p>
          @if (authService.isAuthenticated()) {
            <button (click)="navigateToDashboard()" class="btn-primary btn-lg">
              Go to Dashboard
            </button>
          } @else {
            <a routerLink="/register" class="btn-primary btn-lg">
              Create Free Account
            </a>
          }
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-caudo-dark py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="flex items-center mb-4 md:mb-0">
              <img src="images/caudo-logo.png" alt="Caudo" class="h-8 mr-3">
              <span class="text-gray-400">© 2026 Caudo. All rights reserved.</span>
            </div>
            <div class="flex gap-6">
              <a routerLink="/terms" class="text-gray-400 hover:text-caudo-accent transition-colors">Terms</a>
              <a routerLink="/privacy" class="text-gray-400 hover:text-caudo-accent transition-colors">Privacy</a>
              <a routerLink="/contact" class="text-gray-400 hover:text-caudo-accent transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `
})
export class HomeComponent {
  constructor(public authService: AuthService) { }

  navigateToDashboard(): void {
    this.authService.navigateByRole();
  }
}
