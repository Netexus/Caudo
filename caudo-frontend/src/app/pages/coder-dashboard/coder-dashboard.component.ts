import { Component, OnInit, signal } from '@angular/core';
import { VacancyService } from '../../core/services/vacancy.service';
import { ApplicationService } from '../../core/services/application.service';
import { Vacancy, ApplicationStats } from '../../core/models';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-coder-dashboard',
    standalone: true,
    imports: [NavbarComponent],
    template: `
    <app-navbar></app-navbar>
    
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Find Your Next Opportunity</h1>
          <p class="text-gray-600 mt-2">Browse open vacancies and apply to positions that match your skills</p>
        </div>
        
        <!-- Stats Card -->
        @if (stats()) {
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8 text-white shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium opacity-90">Your Applications</h3>
                <p class="text-3xl font-bold mt-1">{{ stats()?.total }} / {{ stats()?.maxAllowed }}</p>
              </div>
              <div class="text-right">
                <p class="opacity-90">Remaining slots</p>
                <p class="text-2xl font-bold">{{ stats()?.remaining }}</p>
              </div>
            </div>
            @if (stats()?.remaining === 0) {
              <p class="mt-4 text-sm bg-white/20 rounded-lg p-3">
                ⚠️ You've reached the maximum of 3 active applications. Withdraw one to apply elsewhere.
              </p>
            }
          </div>
        }
        
        <!-- Message -->
        @if (message()) {
          <div class="mb-6 p-4 rounded-lg text-sm" 
               [class]="messageType() === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'">
            {{ message() }}
          </div>
        }
        
        <!-- Vacancies Grid -->
        @if (loading()) {
          <div class="text-center py-12">
            <div class="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
            <p class="text-gray-600 mt-4">Loading vacancies...</p>
          </div>
        } @else if (vacancies().length === 0) {
          <div class="text-center py-12 bg-white rounded-2xl shadow">
            <p class="text-gray-500 text-lg">No vacancies available at the moment</p>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (vacancy of vacancies(); track vacancy.id) {
              <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div class="p-6">
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <h3 class="text-xl font-bold text-gray-900 line-clamp-1">{{ vacancy.title }}</h3>
                      <p class="text-indigo-600 font-medium">{{ vacancy.company }}</p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-medium capitalize"
                          [class]="vacancy.modality === 'remote' ? 'bg-green-100 text-green-700' : 
                                   vacancy.modality === 'hybrid' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'">
                      {{ vacancy.modality }}
                    </span>
                  </div>
                  
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ vacancy.description }}</p>
                  
                  <div class="space-y-3 mb-6">
                    <div class="flex items-center text-sm">
                      <span class="w-24 text-gray-500">Technologies:</span>
                      <span class="font-medium text-gray-700">{{ vacancy.technologies }}</span>
                    </div>
                    <div class="flex items-center text-sm">
                      <span class="w-24 text-gray-500">Seniority:</span>
                      <span class="font-medium text-gray-700">{{ vacancy.seniority }}</span>
                    </div>
                    <div class="flex items-center text-sm">
                      <span class="w-24 text-gray-500">Soft Skills:</span>
                      <span class="font-medium text-gray-700">{{ vacancy.softSkills }}</span>
                    </div>
                    <div class="flex items-center text-sm">
                      <span class="w-24 text-gray-500">Location:</span>
                      <span class="font-medium text-gray-700">{{ vacancy.location }}</span>
                    </div>
                    <div class="flex items-center text-sm">
                      <span class="w-24 text-gray-500">Salary:</span>
                      <span class="font-medium text-green-600">{{ vacancy.salaryRange }}</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between pt-4 border-t">
                    <span class="text-sm text-gray-500">
                      {{ vacancy.applicationsCount || 0 }}/{{ vacancy.maxApplicants }} applicants
                    </span>
                    <button 
                      (click)="applyToVacancy(vacancy.id)"
                      [disabled]="applying() === vacancy.id || (stats()?.remaining === 0) || (vacancy.applicationsCount || 0) >= vacancy.maxApplicants"
                      class="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-md">
                      @if (applying() === vacancy.id) {
                        <span>Applying...</span>
                      } @else if ((vacancy.applicationsCount || 0) >= vacancy.maxApplicants) {
                        <span>Full</span>
                      } @else {
                        <span>Apply Now</span>
                      }
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class CoderDashboardComponent implements OnInit {
    vacancies = signal<Vacancy[]>([]);
    stats = signal<ApplicationStats | null>(null);
    loading = signal(true);
    applying = signal<string | null>(null);
    message = signal<string | null>(null);
    messageType = signal<'success' | 'error'>('success');

    constructor(
        private vacancyService: VacancyService,
        private applicationService: ApplicationService
    ) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.loading.set(true);

        this.vacancyService.getAll().subscribe({
            next: (response) => {
                this.vacancies.set(response.data);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.showMessage('Failed to load vacancies', 'error');
            }
        });

        this.applicationService.getStats().subscribe({
            next: (response) => this.stats.set(response.data),
            error: () => { }
        });
    }

    applyToVacancy(vacancyId: string): void {
        this.applying.set(vacancyId);
        this.message.set(null);

        this.applicationService.apply(vacancyId).subscribe({
            next: (response) => {
                this.applying.set(null);
                this.showMessage('Application submitted successfully!', 'success');
                this.loadData(); // Refresh data
            },
            error: (err) => {
                this.applying.set(null);
                this.showMessage(err.error?.message || 'Failed to submit application', 'error');
            }
        });
    }

    private showMessage(msg: string, type: 'success' | 'error'): void {
        this.message.set(msg);
        this.messageType.set(type);
        setTimeout(() => this.message.set(null), 5000);
    }
}
