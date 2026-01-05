import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VacancyService } from '../../core/services/vacancy.service';
import { ApplicationService } from '../../core/services/application.service';
import { Vacancy, ApplicationStats, Application } from '../../core/models';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-coder-dashboard',
    standalone: true,
    imports: [NavbarComponent, DatePipe],
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

        <!-- Active Applications -->
        @if (myApplications().length > 0) {
          <div class="mb-10 animate-fade-in">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Active Applications</h2>
            <div class="grid gap-4">
              @for (app of myApplications(); track app.id) {
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div class="flex items-center gap-3 mb-1">
                      <h3 class="text-lg font-bold text-gray-900">{{ app.vacancy?.title }}</h3>
                      @if (app.vacancy?.status) {
                        <span class="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Open</span>
                      } @else {
                        <span class="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">Closed</span>
                      }
                    </div>
                    <p class="text-gray-600">{{ app.vacancy?.company }} • {{ app.vacancy?.location }}</p>
                    <p class="text-xs text-gray-400 mt-2">Applied on {{ app.appliedAt | date:'mediumDate' }}</p>
                  </div>
                  
                  <button 
                    (click)="initiateWithdraw(app.id)"
                    [disabled]="withdrawing() === app.id"
                    class="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all font-medium text-sm disabled:opacity-50">
                    @if (withdrawing() === app.id) {
                      <span class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Withdrawing...
                      </span>
                    } @else {
                      Withdraw
                    }
                  </button>
                </div>
              }
            </div>
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
                      [disabled]="hasApplied(vacancy.id) || applying() === vacancy.id || (stats()?.remaining === 0) || (vacancy.applicationsCount || 0) >= vacancy.maxApplicants"
                      class="px-5 py-2 rounded-lg font-medium transition-all text-sm shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                      [class]="hasApplied(vacancy.id) 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90'">
                      @if (applying() === vacancy.id) {
                        <span>Applying...</span>
                      } @else if (hasApplied(vacancy.id)) {
                        <span class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Applied
                        </span>
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

      <!-- Confirmation Modal -->
      @if (showWithdrawModal()) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div class="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl transform transition-all">
            <div class="text-center">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Withdraw Application?</h3>
              <p class="text-sm text-gray-500 mb-6">
                Are you sure you want to withdraw this application? You might lose your spot if you try to reapply later.
              </p>
              <div class="flex gap-3 justify-center">
                <button 
                  (click)="cancelWithdraw()"
                  class="btn-outline-light !text-gray-700 !border-gray-300 hover:!bg-gray-50 flex-1">
                  Cancel
                </button>
                <button 
                  (click)="confirmWithdraw()"
                  class="btn bg-red-600 hover:bg-red-700 text-white shadow-md flex-1">
                  Yes, Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class CoderDashboardComponent implements OnInit {
    vacancies = signal<Vacancy[]>([]);
    myApplications = signal<Application[]>([]);
    stats = signal<ApplicationStats | null>(null);
    loading = signal(true);
    applying = signal<string | null>(null);
    withdrawing = signal<string | null>(null);
    message = signal<string | null>(null);
    messageType = signal<'success' | 'error'>('success');

    // Modal state
    showWithdrawModal = signal(false);
    selectedApplicationId = signal<string | null>(null);

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
                this.loadUserApplications();
            },
            error: () => {
                this.loading.set(false);
                this.showMessage('Failed to load vacancies', 'error');
            }
        });
    }

    loadUserApplications(): void {
        this.applicationService.getMyApplications().subscribe({
            next: (response) => {
                this.myApplications.set(response.data);
            },
            error: () => {
                console.error('Failed to load applications');
            }
        });

        this.applicationService.getStats().subscribe({
            next: (response) => {
                this.stats.set(response.data);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }

    hasApplied(vacancyId: string): boolean {
        return this.myApplications().some(app => app.vacancyId === vacancyId);
    }

    applyToVacancy(vacancyId: string): void {
        this.applying.set(vacancyId);
        this.message.set(null);

        this.applicationService.apply(vacancyId).subscribe({
            next: (response) => {
                this.applying.set(null);
                this.showMessage('Application submitted successfully!', 'success');
                this.loadData();
            },
            error: (err) => {
                this.applying.set(null);
                this.showMessage(err.error?.message || 'Failed to submit application', 'error');
            }
        });
    }

    initiateWithdraw(applicationId: string): void {
        this.selectedApplicationId.set(applicationId);
        this.showWithdrawModal.set(true);
    }

    cancelWithdraw(): void {
        this.showWithdrawModal.set(false);
        this.selectedApplicationId.set(null);
    }

    confirmWithdraw(): void {
        const appId = this.selectedApplicationId();
        if (!appId) return;

        this.withdrawing.set(appId);
        this.message.set(null);
        this.showWithdrawModal.set(false);

        this.applicationService.withdraw(appId).subscribe({
            next: () => {
                this.withdrawing.set(null);
                this.selectedApplicationId.set(null);
                this.showMessage('Application withdrawn successfully', 'success');
                this.loadData();
            },
            error: (err) => {
                this.withdrawing.set(null);
                this.showMessage(err.error?.message || 'Failed to withdraw application', 'error');
            }
        });
    }

    private showMessage(msg: string, type: 'success' | 'error'): void {
        this.message.set(msg);
        this.messageType.set(type);
        setTimeout(() => this.message.set(null), 5000);
    }
}
