import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-privacy',
    standalone: true,
    imports: [NavbarComponent],
    template: `
    <app-navbar></app-navbar>
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Política de Privacidad</h1>
          <div class="prose max-w-none text-gray-600 space-y-4">
            <p>En Caudo, valoramos y respetamos tu privacidad. Esta política describe cómo recopilamos y utilizamos tu información personal.</p>
            
            <h3 class="text-lg font-semibold text-gray-800">1. Recopilación de Información</h3>
            <p>Recopilamos información que nos proporcionas al registrarte, como tu nombre, correo electrónico y perfil profesional, para facilitar los procesos de reclutamiento.</p>

            <h3 class="text-lg font-semibold text-gray-800">2. Uso de la Información</h3>
            <p>Tu información se utiliza para conectarte con oportunidades laborales, mejorar nuestros servicios y comunicarnos contigo sobre actualizaciones relevantes.</p>

            <h3 class="text-lg font-semibold text-gray-800">3. Protección de Datos</h3>
            <p>Implementamos medidas de seguridad robustas para proteger tus datos contra accesos no autorizados, alteraciones o divulgaciones.</p>

            <h3 class="text-lg font-semibold text-gray-800">4. Compartir Información</h3>
            <p>No vendemos tu información personal a terceros. Solo compartimos datos relevantes con reclutadores cuando aplicas a una vacante específica.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PrivacyComponent { }
