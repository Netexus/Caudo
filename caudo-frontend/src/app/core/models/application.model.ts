import { Vacancy } from './vacancy.model';
import { User } from './user.model';

export interface Application {
    id: string;
    userId: string;
    vacancyId: string;
    appliedAt: Date;
    vacancy?: Vacancy;
    user?: User;
}

export interface ApplicationStats {
    total: number;
    remaining: number;
    maxAllowed: number;
}

export interface CreateApplicationRequest {
    vacancyId: string;
}
