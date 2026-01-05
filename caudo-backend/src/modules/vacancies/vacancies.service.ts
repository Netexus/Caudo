import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from '../../entities/vacancy.entity';
import { CreateVacancyDto, UpdateVacancyDto } from './dto/vacancy.dto';

@Injectable()
export class VacanciesService {
    constructor(
        @InjectRepository(Vacancy)
        private vacancyRepository: Repository<Vacancy>,
    ) { }

    async create(createVacancyDto: CreateVacancyDto) {
        const vacancy = this.vacancyRepository.create(createVacancyDto);
        await this.vacancyRepository.save(vacancy);
        return {
            message: 'Vacancy created successfully',
            data: vacancy,
        };
    }

    async findAll() {
        const vacancies = await this.vacancyRepository.find({
            where: { status: true },
            relations: ['applications'],
            order: { createdAt: 'DESC' },
        });
        return {
            message: 'Vacancies retrieved successfully',
            data: vacancies.map((v) => ({
                ...v,
                applicationsCount: v.applications?.length || 0,
            })),
        };
    }

    async findOne(id: string) {
        const vacancy = await this.vacancyRepository.findOne({
            where: { id },
            relations: ['applications'],
        });

        if (!vacancy) {
            throw new NotFoundException('Vacancy not found');
        }

        return {
            message: 'Vacancy retrieved successfully',
            data: {
                ...vacancy,
                applicationsCount: vacancy.applications?.length || 0,
            },
        };
    }

    async update(id: string, updateVacancyDto: UpdateVacancyDto) {
        const vacancy = await this.vacancyRepository.findOne({ where: { id } });

        if (!vacancy) {
            throw new NotFoundException('Vacancy not found');
        }

        Object.assign(vacancy, updateVacancyDto);
        await this.vacancyRepository.save(vacancy);

        return {
            message: 'Vacancy updated successfully',
            data: vacancy,
        };
    }

    async remove(id: string) {
        const vacancy = await this.vacancyRepository.findOne({ where: { id } });

        if (!vacancy) {
            throw new NotFoundException('Vacancy not found');
        }

        await this.vacancyRepository.remove(vacancy);
        return {
            message: 'Vacancy deleted successfully',
            data: null,
        };
    }

    async getMetrics() {
        const totalVacancies = await this.vacancyRepository.count();
        const activeVacancies = await this.vacancyRepository.count({ where: { status: true } });
        const vacanciesWithApplicants = await this.vacancyRepository.find({
            relations: ['applications'],
        });

        const totalApplications = vacanciesWithApplicants.reduce(
            (sum, v) => sum + (v.applications?.length || 0),
            0,
        );

        return {
            message: 'Metrics retrieved successfully',
            data: {
                totalVacancies,
                activeVacancies,
                totalApplications,
            },
        };
    }
}
