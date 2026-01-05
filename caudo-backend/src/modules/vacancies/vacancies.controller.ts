import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto, UpdateVacancyDto } from './dto/vacancy.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../entities/user.entity';

@ApiTags('Vacancies')
@Controller('vacancies')
export class VacanciesController {
    constructor(private readonly vacanciesService: VacanciesService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new vacancy (Admin/Manager only)' })
    create(@Body() createVacancyDto: CreateVacancyDto) {
        return this.vacanciesService.create(createVacancyDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all active vacancies' })
    findAll() {
        return this.vacanciesService.findAll();
    }

    @Get('metrics')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get vacancy metrics (Admin/Manager only)' })
    getMetrics() {
        return this.vacanciesService.getMetrics();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a vacancy by ID' })
    findOne(@Param('id') id: string) {
        return this.vacanciesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a vacancy (Admin/Manager only)' })
    update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
        return this.vacanciesService.update(id, updateVacancyDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a vacancy (Admin/Manager only)' })
    remove(@Param('id') id: string) {
        return this.vacanciesService.remove(id);
    }
}
