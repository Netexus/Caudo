import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/application.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../entities/user.entity';

@ApiTags('Applications')
@Controller('applications')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) { }

    @Post()
    @UseGuards(RolesGuard)
    @Roles(UserRole.CODER)
    @ApiOperation({ summary: 'Apply to a vacancy (Coder only)' })
    apply(@Request() req, @Body() createApplicationDto: CreateApplicationDto) {
        return this.applicationsService.apply(req.user.id, createApplicationDto);
    }

    @Get('my-applications')
    @ApiOperation({ summary: 'Get current user applications' })
    findMyApplications(@Request() req) {
        return this.applicationsService.findUserApplications(req.user.id);
    }

    @Get('stats')
    @ApiOperation({ summary: 'Get application stats for current user' })
    getStats(@Request() req) {
        return this.applicationsService.getApplicationStats(req.user.id);
    }

    @Get('vacancy/:vacancyId')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @ApiOperation({ summary: 'Get applications for a vacancy (Admin/Manager only)' })
    findVacancyApplications(@Param('vacancyId') vacancyId: string) {
        return this.applicationsService.findVacancyApplications(vacancyId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Withdraw an application' })
    withdraw(@Request() req, @Param('id') id: string) {
        return this.applicationsService.withdraw(req.user.id, id);
    }
}
