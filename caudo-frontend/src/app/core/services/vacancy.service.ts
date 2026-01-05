import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacancy, CreateVacancyRequest, VacancyMetrics } from '../models';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

@Injectable({
    providedIn: 'root'
})
export class VacancyService {
    private readonly API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll(): Observable<ApiResponse<Vacancy[]>> {
        return this.http.get<ApiResponse<Vacancy[]>>(`${this.API_URL}/vacancies`);
    }

    getById(id: string): Observable<ApiResponse<Vacancy>> {
        return this.http.get<ApiResponse<Vacancy>>(`${this.API_URL}/vacancies/${id}`);
    }

    create(vacancy: CreateVacancyRequest): Observable<ApiResponse<Vacancy>> {
        return this.http.post<ApiResponse<Vacancy>>(`${this.API_URL}/vacancies`, vacancy);
    }

    update(id: string, vacancy: Partial<CreateVacancyRequest>): Observable<ApiResponse<Vacancy>> {
        return this.http.patch<ApiResponse<Vacancy>>(`${this.API_URL}/vacancies/${id}`, vacancy);
    }

    delete(id: string): Observable<ApiResponse<null>> {
        return this.http.delete<ApiResponse<null>>(`${this.API_URL}/vacancies/${id}`);
    }

    getMetrics(): Observable<ApiResponse<VacancyMetrics>> {
        return this.http.get<ApiResponse<VacancyMetrics>>(`${this.API_URL}/vacancies/metrics`);
    }
}
