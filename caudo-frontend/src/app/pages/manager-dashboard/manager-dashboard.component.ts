import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VacancyService } from '../../core/services/vacancy.service';
import { Vacancy, VacancyMetrics, CreateVacancyRequest } from '../../core/models';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-manager-dashboard',
    standalone: true,
    imports: [NavbarComponent, FormsModule],
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
                  <input type="text" [(ngModel)]="form.location" name="location" required
                         class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="New York, USA">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                  <input type="text" [(ngModel)]="form.salaryRange" name="salaryRange" required
                         class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="$80,000 - $120,000">
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
                  <div class="border border-gray-200 rounded-xl p-4 hover:border-indigo-200 transition-colors">
                    <div class="flex items-start justify-between mb-2">
                      <div>
                        <h3 class="font-bold text-gray-900">{{ vacancy.title }}</h3>
                        <p class="text-sm text-indigo-600">{{ vacancy.company }}</p>
                      </div>
                      <span class="px-2 py-1 rounded-full text-xs font-medium"
                            [class]="vacancy.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'">
                        {{ vacancy.status ? 'Active' : 'Closed' }}
                      </span>
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
      </div>
    </div>
  `
})
export class ManagerDashboardComponent implements OnInit {
    vacancies = signal<Vacancy[]>([]);
    metrics = signal<VacancyMetrics | null>(null);
    loading = signal(true);
    creating = signal(false);
    message = signal<string | null>(null);
    messageType = signal<'success' | 'error'>('success');

    form: CreateVacancyRequest = {
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

    constructor(private vacancyService: VacancyService) { }

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

        this.vacancyService.create(this.form).subscribe({
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
