import { IsString, IsNotEmpty, IsEnum, IsInt, IsBoolean, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Modality } from '../../../entities/vacancy.entity';

export class CreateVacancyDto {
    @ApiProperty({ example: 'Senior Backend Developer' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'We are looking for an experienced backend developer...' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 'Node.js, NestJS, PostgreSQL, TypeScript' })
    @IsString()
    @IsNotEmpty()
    technologies: string;

    @ApiProperty({ example: 'Senior' })
    @IsString()
    @IsNotEmpty()
    seniority: string;

    @ApiProperty({ example: 'Communication, Teamwork, Problem-solving' })
    @IsString()
    @IsNotEmpty()
    softSkills: string;

    @ApiProperty({ example: 'New York, USA' })
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({ enum: Modality, example: Modality.REMOTE })
    @IsEnum(Modality)
    modality: Modality;

    @ApiProperty({ example: '$80,000 - $120,000' })
    @IsString()
    @IsNotEmpty()
    salaryRange: string;

    @ApiProperty({ example: 'Acme Corp' })
    @IsString()
    @IsNotEmpty()
    company: string;

    @ApiProperty({ example: 10 })
    @IsInt()
    @Min(1)
    maxApplicants: number;
}

export class UpdateVacancyDto {
    @ApiPropertyOptional({ example: 'Senior Backend Developer' })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({ example: 'Updated description...' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ example: 'Node.js, NestJS, PostgreSQL' })
    @IsString()
    @IsOptional()
    technologies?: string;

    @ApiPropertyOptional({ example: 'Senior' })
    @IsString()
    @IsOptional()
    seniority?: string;

    @ApiPropertyOptional({ example: 'Leadership, Communication' })
    @IsString()
    @IsOptional()
    softSkills?: string;

    @ApiPropertyOptional({ example: 'Remote' })
    @IsString()
    @IsOptional()
    location?: string;

    @ApiPropertyOptional({ enum: Modality })
    @IsEnum(Modality)
    @IsOptional()
    modality?: Modality;

    @ApiPropertyOptional({ example: '$90,000 - $130,000' })
    @IsString()
    @IsOptional()
    salaryRange?: string;

    @ApiPropertyOptional({ example: 'Acme Corp' })
    @IsString()
    @IsOptional()
    company?: string;

    @ApiPropertyOptional({ example: 15 })
    @IsInt()
    @Min(1)
    @IsOptional()
    maxApplicants?: number;

    @ApiPropertyOptional({ example: true })
    @IsBoolean()
    @IsOptional()
    status?: boolean;
}
