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
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <div class="prose max-w-none text-gray-600 space-y-4">
            <p>At Caudo, we value and respect your privacy. This policy describes how we collect and use your personal information.</p>
            
            <h3 class="text-lg font-semibold text-gray-800">1. Information Collection</h3>
            <p>We collect information you provide when registering, such as your name, email, and professional profile, to facilitate recruitment processes.</p>

            <h3 class="text-lg font-semibold text-gray-800">2. Use of Information</h3>
            <p>Your information is used to connect you with job opportunities, improve our services, and communicate with you about relevant updates.</p>

            <h3 class="text-lg font-semibold text-gray-800">3. Data Protection</h3>
            <p>We implement robust security measures to protect your data against unauthorized access, alteration, or disclosure.</p>

            <h3 class="text-lg font-semibold text-gray-800">4. Sharing Information</h3>
            <p>We do not sell your personal information to third parties. We only share relevant data with recruiters when you apply for a specific vacancy.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PrivacyComponent { }
