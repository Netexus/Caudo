import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink, NavbarComponent],
    template: `
    <div class="min-h-screen bg-caudo-bg">
      <app-navbar></app-navbar>
      
      <!-- Hero Section -->
      <section class="relative bg-gradient-caudo bg-hero-pattern overflow-hidden">
        <!-- Decorative Circles -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-caudo-accent/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-caudo-accent/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div class="text-center animate-fade-in">
            <!-- Logo -->
            <img 
              src="assets/images/caudo-logo.png" 
              alt="Caudo Logo" 
              class="h-20 mx-auto mb-8 drop-shadow-lg"
            >
            
            <!-- Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Conectando <span class="text-caudo-accent">Talento Tech</span><br>
              con el Futuro
            </h1>
            
            <!-- Subtitle -->
            <p class="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
              La plataforma exclusiva para Coders y Gestores que buscan su próxima gran oportunidad.
            </p>
            
            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a routerLink="/coder-dashboard" class="btn-primary btn-lg">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                Buscar Vacantes
              </a>
              <a routerLink="/register" [queryParams]="{role: 'manager'}" class="btn-outline-light btn-lg">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                Soy Empresa/Gestor
              </a>
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
              ¿Por qué elegir Caudo?
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Una plataforma diseñada para conectar el mejor talento tech con las mejores oportunidades.
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Feature 1: Coders -->
            <div class="card p-8 text-center animate-fade-in animate-delay-100">
              <div class="w-16 h-16 bg-caudo-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-caudo-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-caudo-primary mb-3">Postulación Inteligente</h3>
              <p class="text-gray-600">
                Aplica solo a lo que te interesa. Límite de 3 postulaciones activas para asegurar calidad y enfoque.
              </p>
            </div>
            
            <!-- Feature 2: Managers -->
            <div class="card p-8 text-center animate-fade-in animate-delay-200">
              <div class="w-16 h-16 bg-caudo-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-caudo-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-caudo-primary mb-3">Gestión Eficiente</h3>
              <p class="text-gray-600">
                Publica vacantes con cupos definidos y encuentra el talento exacto con filtros avanzados.
              </p>
            </div>
            
            <!-- Feature 3: Tech -->
            <div class="card p-8 text-center animate-fade-in animate-delay-300">
              <div class="w-16 h-16 bg-caudo-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-caudo-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-caudo-primary mb-3">Stack Moderno</h3>
              <p class="text-gray-600">
                Plataforma construida con las últimas tecnologías para una experiencia veloz y confiable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-caudo-primary py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold text-white mb-4">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p class="text-xl text-gray-300 mb-8">
            Únete a la comunidad de profesionales tech que ya confían en Caudo.
          </p>
          <a routerLink="/register" class="btn-primary btn-lg">
            Crear Cuenta Gratis
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-caudo-dark py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="flex items-center mb-4 md:mb-0">
              <img src="assets/images/caudo-logo.png" alt="Caudo" class="h-8 mr-3">
              <span class="text-gray-400">© 2026 Caudo. Todos los derechos reservados.</span>
            </div>
            <div class="flex gap-6">
              <a href="#" class="text-gray-400 hover:text-caudo-accent transition-colors">Términos</a>
              <a href="#" class="text-gray-400 hover:text-caudo-accent transition-colors">Privacidad</a>
              <a href="#" class="text-gray-400 hover:text-caudo-accent transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `
})
export class HomeComponent { }
