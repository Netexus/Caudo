import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VacanciesService } from './vacancies.service';
import { Vacancy, Modality } from '../../entities/vacancy.entity';
import { NotFoundException } from '@nestjs/common';

const mockVacancyRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    count: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('VacanciesService', () => {
    let service: VacanciesService;
    let repository: MockRepository<Vacancy>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VacanciesService,
                {
                    provide: getRepositoryToken(Vacancy),
                    useFactory: mockVacancyRepository,
                },
            ],
        }).compile();

        service = module.get<VacanciesService>(VacanciesService);
        repository = module.get<MockRepository<Vacancy>>(getRepositoryToken(Vacancy));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a vacancy', async () => {
            const createDto = {
                title: 'Test Vacancy',
                description: 'Test Description',
                technologies: 'NestJS',
                seniority: 'Junior',
                softSkills: 'Communication',
                location: 'Remote',
                modality: Modality.REMOTE,
                salaryRange: '1000-2000',
                company: 'Test Corp',
                maxApplicants: 5,
            };

            repository.create.mockReturnValue(createDto);
            repository.save.mockResolvedValue({ id: '1', ...createDto });

            const result = await service.create(createDto);

            expect(result.message).toEqual('Vacancy created successfully');
            expect(result.data).toBeDefined();
        });
    });

    describe('findAll', () => {
        it('should return all vacancies', async () => {
            const mockVacancies = [
                { id: '1', title: 'Test 1', applications: [] },
                { id: '2', title: 'Test 2', applications: [{ id: 'app1' }] },
            ];
            repository.find.mockResolvedValue(mockVacancies);

            const result = await service.findAll();

            expect(result.data).toHaveLength(2);
            expect(result.data[0].applicationsCount).toBe(0);
            expect(result.data[1].applicationsCount).toBe(1);
        });
    });

    describe('findOne', () => {
        it('should return a vacancy by id', async () => {
            const mockVacancy = { id: '1', title: 'Test', applications: [] };
            repository.findOne.mockResolvedValue(mockVacancy);

            const result = await service.findOne('1');
            expect(result.data.id).toEqual('1');
        });

        it('should throw NotFoundException if vacancy not found', async () => {
            repository.findOne.mockResolvedValue(null);
            await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a vacancy', async () => {
            const mockVacancy = { id: '1' };
            repository.findOne.mockResolvedValue(mockVacancy);
            repository.remove.mockResolvedValue(mockVacancy);

            const result = await service.remove('1');
            expect(result.message).toContain('deleted');
        });

        it('should throw NotFoundException if vacancy to remove not found', async () => {
            repository.findOne.mockResolvedValue(null);
            await expect(service.remove('999')).rejects.toThrow(NotFoundException);
        });
    });

    describe('getMetrics', () => {
        it('should return metrics', async () => {
            repository.count.mockResolvedValueOnce(10); // Total
            repository.count.mockResolvedValueOnce(5); // Active
            repository.find.mockResolvedValue([
                { applications: [{}, {}] }, // 2
                { applications: [{}] }, // 1
            ]);

            const result = await service.getMetrics();
            expect(result.data.totalVacancies).toBe(10);
            expect(result.data.activeVacancies).toBe(5);
            expect(result.data.totalApplications).toBe(3);
        });
    });
});
