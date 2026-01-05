export interface Vacancy {
    id: string;
    title: string;
    description: string;
    technologies: string;
    seniority: string;
    softSkills: string;
    location: string;
    modality: 'remote' | 'hybrid' | 'onsite';
    salaryRange: string;
    company: string;
    maxApplicants: number;
    status: boolean;
    createdAt: Date;
    applicationsCount?: number;
}

export interface CreateVacancyRequest {
    title: string;
    description: string;
    technologies: string;
    seniority: string;
    softSkills: string;
    location: string;
    modality: 'remote' | 'hybrid' | 'onsite';
    salaryRange: string;
    company: string;
    maxApplicants: number;
}

export interface VacancyMetrics {
    totalVacancies: number;
    activeVacancies: number;
    totalApplications: number;
}
