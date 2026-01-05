import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Application } from './application.entity';

export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    CODER = 'coder',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CODER,
    })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Application, (application) => application.user)
    applications: Application[];
}
