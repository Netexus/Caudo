import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VacancyService } from '../../core/services/vacancy.service';
import { Vacancy, VacancyMetrics, CreateVacancyRequest, Application } from '../../core/models';
import { ApplicationService } from '../../core/services/application.service';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [NavbarComponent, FormsModule, DatePipe],
  template: `
    <app-navbar></app-navbar>
    
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
          <p class="text-gray-600 mt-2">Create and manage vacancies for your organization</p>
        </div>
        
        <!-- Metrics Cards -->
        @if (metrics()) {
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-2xl p-6 shadow-lg">
              <p class="text-gray-500 text-sm">Total Vacancies</p>
              <p class="text-3xl font-bold text-indigo-600 mt-2">{{ metrics()?.totalVacancies }}</p>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-lg">
              <p class="text-gray-500 text-sm">Active Vacancies</p>
              <p class="text-3xl font-bold text-green-600 mt-2">{{ metrics()?.activeVacancies }}</p>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-lg">
              <p class="text-gray-500 text-sm">Total Applications</p>
              <p class="text-3xl font-bold text-purple-600 mt-2">{{ metrics()?.totalApplications }}</p>
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
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Create Vacancy Form -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Create New Vacancy</h2>
            
            <form (ngSubmit)="createVacancy()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input type="text" [(ngModel)]="form.title" name="title" required
                         class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="Senior Backend Developer">
                </div>
                
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea [(ngModel)]="form.description" name="description" required rows="3"
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Describe the role and responsibilities..."></textarea>
                </div>
                
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
                  <input type="text" [(ngModel)]="form.technologies" name="technologies" required
                         class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="Node.js, TypeScript, PostgreSQL">
                </div>
                
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Soft Skills</label>
                  <input type="text" [(ngModel)]="form.softSkills" name="softSkills" required
                         class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="Communication, Teamwork, Problem-solving">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Seniority</label>
                  <select [(ngModel)]="form.seniority" name="seniority" required
                          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Modality</label>
                  <select [(ngModel)]="form.modality" name="modality" required
                          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select [(ngModel)]="form.location" name="location" required
                          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="" disabled selected>Select a city</option>
                    <option value="Medellín">Medellín</option>
                    <option value="Barranquilla">Barranquilla</option>
                    <option value="Bogotá">Bogotá</option>
                    <option value="Cartagena">Cartagena</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Salary (USD)</label>
                  <input type="number" [(ngModel)]="form.salaryRange" name="salaryRange" required min="0"
                         class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="120000">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input type="text" [(ngModel)]="form.company" name="company" required
                         class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="Acme Corp">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Max Applicants</label>
                  <input type="number" [(ngModel)]="form.maxApplicants" name="maxApplicants" required min="1"
                         class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="10">
                </div>
              </div>
              
              <button type="submit" [disabled]="creating()"
                      class="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 shadow-lg">
                @if (creating()) {
                  <span>Creating...</span>
                } @else {
                  <span>Create Vacancy</span>
                }
              </button>
            </form>
          </div>
          
          <!-- Vacancies List -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Your Vacancies</h2>
            
            @if (loading()) {
              <div class="text-center py-8">
                <div class="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
              </div>
            } @else if (vacancies().length === 0) {
              <p class="text-gray-500 text-center py-8">No vacancies created yet</p>
            } @else {
              <div class="space-y-4 max-h-[600px] overflow-y-auto">
                @for (vacancy of vacancies(); track vacancy.id) {
                  <div class="border border-gray-200 rounded-xl p-4 hover:border-indigo-200 transition-colors group relative">
                    <div class="flex items-start justify-between mb-2">
                      <div>
                        <h3 class="font-bold text-gray-900">{{ vacancy.title }}</h3>
                        <p class="text-sm text-indigo-600">{{ vacancy.company }}</p>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-1 rounded-full text-xs font-medium"
                              [class]="vacancy.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'">
                          {{ vacancy.status ? 'Active' : 'Closed' }}
                        </span>
                        
                        <!-- View Applicants Button -->
                        <button (click)="viewApplicants(vacancy)" 
                                class="text-indigo-600 hover:text-indigo-800 transition-colors p-1 rounded-full hover:bg-indigo-50"
                                title="View Applicants">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </button>
                        
                        <button (click)="initiateDelete(vacancy.id)" 
                                [disabled]="deleting() === vacancy.id"
                                class="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                                title="Delete Vacancy">
                          @if (deleting() === vacancy.id) {
                            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                          } @else {
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                          }
                        </button>
                      </div>
                    </div>
                    <div class="flex items-center justify-between text-sm text-gray-600">
                      <span>{{ vacancy.seniority }} • {{ vacancy.modality }}</span>
                      <span>{{ vacancy.applicationsCount || 0 }}/{{ vacancy.maxApplicants }} applications</span>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
        
        <!-- Delete Confirmation Modal -->
        @if (showDeleteModal()) {
          <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div class="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
              <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Delete Vacancy?</h3>
                <p class="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete this vacancy? This action cannot be undone and will remove all associated applications.
                </p>
                <div class="flex gap-3 justify-center">
                  <button 
                    (click)="cancelDelete()"
                    class="btn-outline-light !text-gray-700 !border-gray-300 hover:!bg-gray-50 flex-1">
                    Cancel
                  </button>
                  <button 
                    (click)="confirmDelete()"
                    class="btn bg-red-600 hover:bg-red-700 text-white shadow-md flex-1">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- Applicants Modal -->
        @if (showApplicantsModal()) {
          <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
              <!-- Modal Header -->
              <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 class="text-lg font-bold text-gray-900">Applicants</h3>
                  <p class="text-sm text-gray-500">For vacancy: {{ selectedVacancyTitle() }}</p>
                </div>
                <button (click)="closeApplicantsModal()" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Modal Body -->
              <div class="p-6 overflow-y-auto">
                @if (loadingApplicants()) {
                  <div class="flex justify-center py-8">
                    <div class="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
                  </div>
                } @else if (currentVacancyApplicants().length === 0) {
                  <div class="text-center py-8 text-gray-500">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <p>No applicants yet for this vacancy.</p>
                  </div>
                } @else {
                  <div class="space-y-4">
                    @for (app of currentVacancyApplicants(); track app.id) {
                      <div class="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors border border-gray-100">
                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {{ app.user?.name?.charAt(0) || 'U' }}
                        </div>
                        <div class="ml-4 flex-1">
                          <h4 class="text-sm font-semibold text-gray-900">{{ app.user?.name || 'Unknown User' }}</h4>
                          <p class="text-sm text-gray-500">{{ app.user?.email }}</p>
                        </div>
                        <div class="text-right text-xs text-gray-500">
                          <p>Applied on</p>
                          <p class="font-medium">{{ app.appliedAt | date:'mediumDate' }}</p>
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>

              <!-- Modal Footer -->
              <div class="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                <button (click)="closeApplicantsModal()" class="btn-primary px-6">
                  Close
                </button>
              </div>
            </div>
          </div>
        }

      </div>
    </div>
  `
})
export class ManagerDashboardComponent implements OnInit {
  vacancies = signal<Vacancy[]>([]);
  metrics = signal<VacancyMetrics | null>(null);
  loading = signal(true);
  creating = signal(false);
  deleting = signal<string | null>(null);
  message = signal<string | null>(null);
  messageType = signal<'success' | 'error'>('success');

  // Modal state
  showDeleteModal = signal(false);
  selectedVacancyId = signal<string | null>(null);

  // Applicants Modal state
  showApplicantsModal = signal(false);
  loadingApplicants = signal(false);
  currentVacancyApplicants = signal<Application[]>([]);
  selectedVacancyTitle = signal<string>('');

  form: CreateVacancyRequest = {
    title: '',
    description: '',
    technologies: '',
    seniority: 'Mid',
    softSkills: '',
    location: '',
    modality: 'remote',
    salaryRange: '', // Bind to string but input type=number will work for form submission
    company: '',
    maxApplicants: 10
  };

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
      error: () => this.loading.set(false)
    });

    this.vacancyService.getMetrics().subscribe({
      next: (response) => this.metrics.set(response.data),
      error: () => { }
    });
  }

  createVacancy(): void {
    this.creating.set(true);
    this.message.set(null);

    const payload = { ...this.form, salaryRange: this.form.salaryRange.toString() };

    this.vacancyService.create(payload).subscribe({
      next: (response) => {
        this.creating.set(false);
        this.showMessage('Vacancy created successfully!', 'success');
        this.resetForm();
        this.loadData();
      },
      error: (err) => {
        this.creating.set(false);
        this.showMessage(err.error?.message || 'Failed to create vacancy', 'error');
      }
    });
  }

  initiateDelete(vacancyId: string): void {
    this.selectedVacancyId.set(vacancyId);
    this.showDeleteModal.set(true);
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.selectedVacancyId.set(null);
  }

  confirmDelete(): void {
    const id = this.selectedVacancyId();
    if (!id) return;

    this.deleting.set(id);
    this.showDeleteModal.set(false);
    this.message.set(null);

    this.vacancyService.delete(id).subscribe({
      next: () => {
        this.deleting.set(null);
        this.selectedVacancyId.set(null);
        this.showMessage('Vacancy deleted successfully', 'success');
        this.deleting.set(null);
        this.selectedVacancyId.set(null);
        this.showMessage('Vacancy deleted successfully', 'success');
        this.loadData();
      },
      error: (err) => {
        this.deleting.set(null);
        this.showMessage(err.error?.message || 'Failed to delete vacancy', 'error');
      }
    });
  }

  viewApplicants(vacancy: Vacancy): void {
    this.selectedVacancyTitle.set(vacancy.title);
    this.showApplicantsModal.set(true);
    this.loadingApplicants.set(true);
    this.currentVacancyApplicants.set([]);

    this.applicationService.getVacancyApplications(vacancy.id).subscribe({
      next: (response) => {
        this.currentVacancyApplicants.set(response.data);
        this.loadingApplicants.set(false);
      },
      error: (err) => {
        this.loadingApplicants.set(false);
        this.showMessage('Failed to load applicants', 'error');
      }
    });
  }

  closeApplicantsModal(): void {
    this.showApplicantsModal.set(false);
    this.currentVacancyApplicants.set([]);
    this.selectedVacancyTitle.set('');
  }

  private resetForm(): void {
    this.form = {
      title: '',
      description: '',
      technologies: '',
      seniority: 'Mid',
      softSkills: '',
      location: '',
      modality: 'remote',
      salaryRange: '',
      company: '',
      maxApplicants: 10
    };
  }

  private showMessage(msg: string, type: 'success' | 'error'): void {
    this.message.set(msg);
    this.messageType.set(type);
    setTimeout(() => this.message.set(null), 5000);
  }
}
