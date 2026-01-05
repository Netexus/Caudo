import { Injectable, BadRequestException, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../../entities/application.entity';
import { Vacancy } from '../../entities/vacancy.entity';
import { User, UserRole } from '../../entities/user.entity';
import { CreateApplicationDto } from './dto/application.dto';

@Injectable()
export class ApplicationsService {
    private readonly MAX_ACTIVE_APPLICATIONS = 3;

    constructor(
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>,
        @InjectRepository(Vacancy)
        private vacancyRepository: Repository<Vacancy>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async apply(userId: string, createApplicationDto: CreateApplicationDto) {
        // Get user to verify role
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Only coders can apply
        if (user.role !== UserRole.CODER) {
            throw new ForbiddenException('Only coders can apply to vacancies');
        }

        // Get vacancy with applications
        const vacancy = await this.vacancyRepository.findOne({
            where: { id: createApplicationDto.vacancyId },
            relations: ['applications'],
        });

        if (!vacancy) {
            throw new NotFoundException('Vacancy not found');
        }

        if (!vacancy.status) {
            throw new BadRequestException('This vacancy is no longer active');
        }

        // CRITICAL BUSINESS LOGIC 1: Check vacancy quota (maxApplicants)
        if (vacancy.applications.length >= vacancy.maxApplicants) {
            throw new BadRequestException(
                `This vacancy has reached its maximum number of applicants (${vacancy.maxApplicants})`,
            );
        }

        // CRITICAL BUSINESS LOGIC 2: Check user's active applications limit (max 3)
        const userApplicationsCount = await this.applicationRepository.count({
            where: { userId },
        });

        if (userApplicationsCount >= this.MAX_ACTIVE_APPLICATIONS) {
            throw new BadRequestException(
                `You have reached the maximum limit of ${this.MAX_ACTIVE_APPLICATIONS} active applications`,
            );
        }

        // CRITICAL BUSINESS LOGIC 3: Check for duplicate application
        const existingApplication = await this.applicationRepository.findOne({
            where: { userId, vacancyId: createApplicationDto.vacancyId },
        });

        if (existingApplication) {
            throw new ConflictException('You have already applied to this vacancy');
        }

        // Create application
        const application = this.applicationRepository.create({
            userId,
            vacancyId: createApplicationDto.vacancyId,
        });

        await this.applicationRepository.save(application);

        return {
            message: 'Application submitted successfully',
            data: application,
        };
    }

    async findUserApplications(userId: string) {
        const applications = await this.applicationRepository.find({
            where: { userId },
            relations: ['vacancy'],
            order: { appliedAt: 'DESC' },
        });

        return {
            message: 'Applications retrieved successfully',
            data: applications,
        };
    }

    async findVacancyApplications(vacancyId: string) {
        const applications = await this.applicationRepository.find({
            where: { vacancyId },
            relations: ['user'],
            order: { appliedAt: 'DESC' },
        });

        return {
            message: 'Applications retrieved successfully',
            data: applications.map((app) => ({
                ...app,
                user: {
                    id: app.user.id,
                    name: app.user.name,
                    email: app.user.email,
                },
            })),
        };
    }

    async withdraw(userId: string, applicationId: string) {
        const application = await this.applicationRepository.findOne({
            where: { id: applicationId, userId },
        });

        if (!application) {
            throw new NotFoundException('Application not found');
        }

        await this.applicationRepository.remove(application);

        return {
            message: 'Application withdrawn successfully',
            data: null,
        };
    }

    async getApplicationStats(userId: string) {
        const total = await this.applicationRepository.count({ where: { userId } });
        const remaining = this.MAX_ACTIVE_APPLICATIONS - total;

        return {
            message: 'Application stats retrieved',
            data: {
                total,
                remaining,
                maxAllowed: this.MAX_ACTIVE_APPLICATIONS,
            },
        };
    }
}
