import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
    @ApiProperty({ example: 'uuid-of-vacancy' })
    @IsUUID()
    @IsNotEmpty()
    vacancyId: string;
}
