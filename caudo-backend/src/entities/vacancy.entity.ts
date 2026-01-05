import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Application } from './application.entity';

export enum Modality {
    REMOTE = 'remote',
    HYBRID = 'hybrid',
    ONSITE = 'onsite',
}

@Entity('vacancies')
export class Vacancy {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    technologies: string;

    @Column()
    seniority: string;

    @Column()
    softSkills: string;

    @Column()
    location: string;

    @Column({
        type: 'enum',
        enum: Modality,
        default: Modality.REMOTE,
    })
    modality: Modality;

    @Column()
    salaryRange: string;

    @Column()
    company: string;

    @Column({ default: 10 })
    maxApplicants: number;

    @Column({ default: true })
    status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Application, (application) => application.vacancy)
    applications: Application[];
}
