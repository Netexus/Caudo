import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
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
    @ApiResponse({ status: 201, description: 'Application submitted successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request - Already applied or max quota reached' })
    @ApiResponse({ status: 403, description: 'Forbidden - User role is not Coder' })
    apply(@Request() req, @Body() createApplicationDto: CreateApplicationDto) {
        return this.applicationsService.apply(req.user.id, createApplicationDto);
    }

    @Get('my-applications')
    @ApiOperation({ summary: 'Get current user applications' })
    @ApiResponse({ status: 200, description: 'List of applications retrieved successfully' })
    findMyApplications(@Request() req) {
        return this.applicationsService.findUserApplications(req.user.id);
    }

    @Get('stats')
    @ApiOperation({ summary: 'Get application stats for current user' })
    @ApiResponse({ status: 200, description: 'Stats retrieved successfully' })
    getStats(@Request() req) {
        return this.applicationsService.getApplicationStats(req.user.id);
    }

    @Get('vacancy/:vacancyId')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @ApiOperation({ summary: 'Get applications for a vacancy (Admin/Manager only)' })
    @ApiResponse({ status: 200, description: 'List of applications for vacancy retrieved' })
    @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
    findVacancyApplications(@Param('vacancyId') vacancyId: string) {
        return this.applicationsService.findVacancyApplications(vacancyId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Withdraw an application' })
    @ApiResponse({ status: 200, description: 'Application withdrawn successfully' })
    @ApiResponse({ status: 404, description: 'Application not found' })
    withdraw(@Request() req, @Param('id') id: string) {
        return this.applicationsService.withdraw(req.user.id, id);
    }
}
