import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { VacanciesModule } from './modules/vacancies/vacancies.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { HealthController } from './health.controller';
import { User, Vacancy, Application } from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 1433),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Vacancy, Application],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        options: {
          encrypt: true,
          trustServerCertificate: false,
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    VacanciesModule,
    ApplicationsModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule { }

