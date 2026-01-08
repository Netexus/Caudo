import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <div class="prose max-w-none text-gray-600 space-y-6">
            <p>Do you have any questions, suggestions, or need support? We are here to help you.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div class="bg-indigo-50 p-6 rounded-xl">
                <h3 class="text-xl font-bold text-indigo-900 mb-2">General Support</h3>
                <p class="text-indigo-700">For inquiries about your account or platform usage.</p>
                <a href="mailto:support@caudo.com" class="text-indigo-600 font-semibold hover:text-indigo-800 mt-2 inline-block">support@caudo.com</a>
              </div>

              <div class="bg-purple-50 p-6 rounded-xl">
                <h3 class="text-xl font-bold text-purple-900 mb-2">Business</h3>
                <p class="text-purple-700">For information on how to post vacancies and corporate plans.</p>
                <a href="mailto:business@caudo.com" class="text-purple-600 font-semibold hover:text-purple-800 mt-2 inline-block">business@caudo.com</a>
              </div>
            </div>

            <div class="mt-8 border-t border-gray-100 pt-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Offices</h3>
              <p>Calle Tecnológica 123, Oficina 404<br>Medellín, Colombia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent { }
