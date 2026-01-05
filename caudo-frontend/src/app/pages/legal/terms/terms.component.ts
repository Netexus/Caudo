import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-terms',
    standalone: true,
    imports: [NavbarComponent],
    template: `
    <app-navbar></app-navbar>
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Términos y Condiciones</h1>
          <div class="prose max-w-none text-gray-600 space-y-4">
            <p>Bienvenido a Caudo. Al utilizar nuestra plataforma, aceptas cumplir con los siguientes términos y condiciones:</p>
            
            <h3 class="text-lg font-semibold text-gray-800">1. Uso de la Plataforma</h3>
            <p>Caudo es una plataforma que conecta talentos tecnológicos con oportunidades laborales. El uso indebido de los servicios para fines no relacionados con la empleabilidad está prohibido.</p>

            <h3 class="text-lg font-semibold text-gray-800">2. Cuentas de Usuario</h3>
            <p>Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Caudo no se hace responsable por accesos no autorizados derivados de negligencia del usuario.</p>

            <h3 class="text-lg font-semibold text-gray-800">3. Contenido de Vacantes y Perfiles</h3>
            <p>Toda la información proporcionada en vacantes y perfiles debe ser veraz. Nos reservamos el derecho de eliminar contenido que viole nuestras políticas o sea considerado inapropiado.</p>

            <h3 class="text-lg font-semibold text-gray-800">4. Modificaciones</h3>
            <p>Caudo se reserva el derecho de modificar estos términos en cualquier momento. Se notificará a los usuarios sobre cambios significativos.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TermsComponent { }
