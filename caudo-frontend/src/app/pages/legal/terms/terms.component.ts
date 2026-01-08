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
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
          <div class="prose max-w-none text-gray-600 space-y-4">
            <p>Welcome to Caudo. By using our platform, you agree to comply with the following terms and conditions:</p>
            
            <h3 class="text-lg font-semibold text-gray-800">1. Platform Usage</h3>
            <p>Caudo is a platform that connects tech talent with job opportunities. Misuse of services for purposes unrelated to employability is prohibited.</p>

            <h3 class="text-lg font-semibold text-gray-800">2. User Accounts</h3>
            <p>You are responsible for maintaining the confidentiality of your account and password. Caudo is not responsible for unauthorized access resulting from user negligence.</p>

            <h3 class="text-lg font-semibold text-gray-800">3. Vacancy and Profile Content</h3>
            <p>All information provided in vacancies and profiles must be truthful. We reserve the right to remove content that violates our policies or is deemed inappropriate.</p>

            <h3 class="text-lg font-semibold text-gray-800">4. Modifications</h3>
            <p>Caudo reserves the right to modify these terms at any time. Users will be notified of significant changes.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TermsComponent { }
