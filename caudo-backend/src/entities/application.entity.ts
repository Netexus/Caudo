import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from './user.entity';
import { Vacancy } from './vacancy.entity';

@Entity('applications')
@Unique(['userId', 'vacancyId'])
export class Application {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    vacancyId: string;

    @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Vacancy, (vacancy) => vacancy.applications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vacancyId' })
    vacancy: Vacancy;

    @CreateDateColumn()
    appliedAt: Date;
}
