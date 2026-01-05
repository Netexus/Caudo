import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../entities/user.entity';
import { Vacancy, Modality } from '../entities/vacancy.entity';
import { Application } from '../entities/application.entity';
import { config } from 'dotenv';

config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'caudo',
    entities: [User, Vacancy, Application],
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function seed() {
    console.log('🌱 Starting database seeding...\n');

    try {
        await AppDataSource.initialize();
        console.log('✅ Database connected\n');

        const userRepository = AppDataSource.getRepository(User);
        const vacancyRepository = AppDataSource.getRepository(Vacancy);

        // Check if data already exists
        const existingUsers = await userRepository.count();
        if (existingUsers > 0) {
            console.log('⚠️  Database already has data. Skipping seed to avoid duplicates.');
            console.log('   If you want to reseed, clear the tables first.\n');
            await AppDataSource.destroy();
            return;
        }

        // Create Users
        console.log('👥 Creating users...');
        const hashedPassword = await bcrypt.hash('password123', 10);

        const users = await userRepository.save([
            {
                name: 'Admin User',
                email: 'admin@caudo.com',
                password: hashedPassword,
                role: UserRole.ADMIN,
            },
            {
                name: 'Maria Garcia',
                email: 'maria@caudo.com',
                password: hashedPassword,
                role: UserRole.MANAGER,
            },
            {
                name: 'Carlos Rodriguez',
                email: 'carlos@caudo.com',
                password: hashedPassword,
                role: UserRole.MANAGER,
            },
            {
                name: 'Juan Developer',
                email: 'juan@example.com',
                password: hashedPassword,
                role: UserRole.CODER,
            },
            {
                name: 'Ana Programmer',
                email: 'ana@example.com',
                password: hashedPassword,
                role: UserRole.CODER,
            },
            {
                name: 'Luis Code',
                email: 'luis@example.com',
                password: hashedPassword,
                role: UserRole.CODER,
            },
        ]);

        console.log(`   ✅ Created ${users.length} users\n`);

        // Create Vacancies
        console.log('💼 Creating vacancies...');
        const vacancies = await vacancyRepository.save([
            {
                title: 'Senior Backend Developer',
                description: 'We are looking for an experienced backend developer to join our team and build scalable microservices.',
                technologies: 'Node.js, NestJS, PostgreSQL, Docker, Kubernetes',
                seniority: 'Senior',
                softSkills: 'Leadership, Communication, Problem-solving, Teamwork',
                location: 'San Francisco, CA',
                modality: Modality.REMOTE,
                salaryRange: '$120,000 - $160,000',
                company: 'TechCorp Inc.',
                maxApplicants: 5,
                status: true,
            },
            {
                title: 'Full Stack Developer',
                description: 'Join our product team to develop cutting-edge web applications using modern technologies.',
                technologies: 'React, TypeScript, Node.js, MongoDB',
                seniority: 'Mid',
                softSkills: 'Creativity, Adaptability, Time Management',
                location: 'New York, NY',
                modality: Modality.HYBRID,
                salaryRange: '$90,000 - $120,000',
                company: 'StartupXYZ',
                maxApplicants: 10,
                status: true,
            },
            {
                title: 'Frontend Angular Developer',
                description: 'We need a passionate Angular developer to build beautiful and responsive user interfaces.',
                technologies: 'Angular, TypeScript, TailwindCSS, RxJS',
                seniority: 'Mid',
                softSkills: 'Attention to detail, Communication, Collaboration',
                location: 'Austin, TX',
                modality: Modality.REMOTE,
                salaryRange: '$85,000 - $110,000',
                company: 'DesignStudio',
                maxApplicants: 8,
                status: true,
            },
            {
                title: 'Junior Python Developer',
                description: 'Great opportunity for a junior developer to grow in a supportive environment.',
                technologies: 'Python, Django, PostgreSQL, REST APIs',
                seniority: 'Junior',
                softSkills: 'Eagerness to learn, Teamwork, Communication',
                location: 'Remote - LATAM',
                modality: Modality.REMOTE,
                salaryRange: '$40,000 - $55,000',
                company: 'DataFlow Solutions',
                maxApplicants: 15,
                status: true,
            },
            {
                title: 'DevOps Engineer',
                description: 'Help us build and maintain our cloud infrastructure and CI/CD pipelines.',
                technologies: 'AWS, Terraform, Docker, GitHub Actions, Linux',
                seniority: 'Senior',
                softSkills: 'Problem-solving, Documentation, Mentoring',
                location: 'Seattle, WA',
                modality: Modality.ONSITE,
                salaryRange: '$130,000 - $170,000',
                company: 'CloudNative Corp',
                maxApplicants: 3,
                status: true,
            },
            {
                title: 'Mobile Developer (React Native)',
                description: 'Build cross-platform mobile applications for our growing user base.',
                technologies: 'React Native, TypeScript, Redux, Firebase',
                seniority: 'Mid',
                softSkills: 'User empathy, Creativity, Self-motivation',
                location: 'Miami, FL',
                modality: Modality.HYBRID,
                salaryRange: '$95,000 - $125,000',
                company: 'AppMasters',
                maxApplicants: 6,
                status: true,
            },
        ]);

        console.log(`   ✅ Created ${vacancies.length} vacancies\n`);

        // Summary
        console.log('═══════════════════════════════════════════');
        console.log('🎉 Seeding completed successfully!\n');
        console.log('📋 Test Credentials (password: password123):');
        console.log('   Admin:   admin@caudo.com');
        console.log('   Manager: maria@caudo.com');
        console.log('   Coder:   juan@example.com');
        console.log('═══════════════════════════════════════════\n');

        await AppDataSource.destroy();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seed();
