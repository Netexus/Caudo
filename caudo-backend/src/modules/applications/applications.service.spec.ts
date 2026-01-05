import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationsService } from './applications.service';
import { Application } from '../../entities/application.entity';
import { Vacancy } from '../../entities/vacancy.entity';
import { User, UserRole } from '../../entities/user.entity';
import { NotFoundException, BadRequestException, ForbiddenException, ConflictException } from '@nestjs/common';

const mockRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    count: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ApplicationsService', () => {
    let service: ApplicationsService;
    let appRepo: MockRepository<Application>;
    let vacancyRepo: MockRepository<Vacancy>;
    let userRepo: MockRepository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ApplicationsService,
                { provide: getRepositoryToken(Application), useFactory: mockRepository },
                { provide: getRepositoryToken(Vacancy), useFactory: mockRepository },
                { provide: getRepositoryToken(User), useFactory: mockRepository },
            ],
        }).compile();

        service = module.get<ApplicationsService>(ApplicationsService);
        appRepo = module.get(getRepositoryToken(Application));
        vacancyRepo = module.get(getRepositoryToken(Vacancy));
        userRepo = module.get(getRepositoryToken(User));
    });

    describe('apply', () => {
        const userId = 'user-1';
        const vacancyId = 'vacancy-1';
        const dto = { vacancyId };

        it('should successfully apply', async () => {
            userRepo.findOne.mockResolvedValue({ id: userId, role: UserRole.CODER });
            vacancyRepo.findOne.mockResolvedValue({
                id: vacancyId,
                status: true,
                maxApplicants: 10,
                applications: []
            });
            appRepo.count.mockResolvedValue(0); // 0 active apps
            appRepo.findOne.mockResolvedValue(null); // No duplicates
            appRepo.create.mockReturnValue({ userId, vacancyId });
            appRepo.save.mockResolvedValue({ id: 'app-1', userId, vacancyId });

            const result = await service.apply(userId, dto);
            expect(result.message).toContain('submitted');
        });

        it('should throw Forbidden if user is not a Coder', async () => {
            userRepo.findOne.mockResolvedValue({ id: userId, role: UserRole.MANAGER });
            await expect(service.apply(userId, dto)).rejects.toThrow(ForbiddenException);
        });

        it('should throw NotFound if vacancy not found', async () => {
            userRepo.findOne.mockResolvedValue({ id: userId, role: UserRole.CODER });
            vacancyRepo.findOne.mockResolvedValue(null);
            await expect(service.apply(userId, dto)).rejects.toThrow(NotFoundException);
        });

        it('should throw BadRequest if vacancy quota full', async () => {
            userRepo.findOne.mockResolvedValue({ id: userId, role: UserRole.CODER });
            vacancyRepo.findOne.mockResolvedValue({
                id: vacancyId,
                status: true,
                maxApplicants: 2,
                applications: [{}, {}] // Full
            });
            await expect(service.apply(userId, dto)).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequest if user active apps limit reached', async () => {
            userRepo.findOne.mockResolvedValue({ id: userId, role: UserRole.CODER });
            vacancyRepo.findOne.mockResolvedValue({
                id: vacancyId,
                status: true,
                maxApplicants: 10,
                applications: []
            });
            appRepo.count.mockResolvedValue(3); // Max is 3
            await expect(service.apply(userId, dto)).rejects.toThrow(BadRequestException);
        });

        it('should throw Conflict if already applied', async () => {
            userRepo.findOne.mockResolvedValue({ id: userId, role: UserRole.CODER });
            vacancyRepo.findOne.mockResolvedValue({
                id: vacancyId,
                status: true,
                maxApplicants: 10,
                applications: []
            });
            appRepo.count.mockResolvedValue(0);
            appRepo.findOne.mockResolvedValue({ id: 'existing' }); // Duplicate found
            await expect(service.apply(userId, dto)).rejects.toThrow(ConflictException);
        });
    });

    describe('withdraw', () => {
        it('should withdraw an application', async () => {
            const mockApp = { id: 'app-1', userId: 'user-1' };
            appRepo.findOne.mockResolvedValue(mockApp);
            appRepo.remove.mockResolvedValue(mockApp);

            const result = await service.withdraw('user-1', 'app-1');
            expect(result.message).toContain('withdrawn');
        });

        it('should throw NotFound if application not found', async () => {
            appRepo.findOne.mockResolvedValue(null);
            await expect(service.withdraw('user-1', 'app-1')).rejects.toThrow(NotFoundException);
        });
    });
});
