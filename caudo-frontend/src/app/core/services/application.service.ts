import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application, ApplicationStats, CreateApplicationRequest } from '../models';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private readonly API_URL = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    apply(vacancyId: string): Observable<ApiResponse<Application>> {
        return this.http.post<ApiResponse<Application>>(`${this.API_URL}/applications`, { vacancyId });
    }

    getMyApplications(): Observable<ApiResponse<Application[]>> {
        return this.http.get<ApiResponse<Application[]>>(`${this.API_URL}/applications/my-applications`);
    }

    getStats(): Observable<ApiResponse<ApplicationStats>> {
        return this.http.get<ApiResponse<ApplicationStats>>(`${this.API_URL}/applications/stats`);
    }

    getVacancyApplications(vacancyId: string): Observable<ApiResponse<Application[]>> {
        return this.http.get<ApiResponse<Application[]>>(`${this.API_URL}/applications/vacancy/${vacancyId}`);
    }

    withdraw(applicationId: string): Observable<ApiResponse<null>> {
        return this.http.delete<ApiResponse<null>>(`${this.API_URL}/applications/${applicationId}`);
    }
}
