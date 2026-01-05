import { Vacancy } from './vacancy.model';

export interface Application {
    id: string;
    userId: string;
    vacancyId: string;
    appliedAt: Date;
    vacancy?: Vacancy;
}

export interface ApplicationStats {
    total: number;
    remaining: number;
    maxAllowed: number;
}

export interface CreateApplicationRequest {
    vacancyId: string;
}
