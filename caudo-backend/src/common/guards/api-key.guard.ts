import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export const SKIP_API_KEY = 'skipApiKey';
export const SkipApiKey = () => Reflect.metadata(SKIP_API_KEY, true);

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // Check if endpoint should skip API key validation
        const skipApiKey = this.reflector.getAllAndOverride<boolean>(SKIP_API_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (skipApiKey) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];
        const validApiKey = process.env.API_KEY || 'caudo-api-key-2024';

        if (!apiKey) {
            throw new UnauthorizedException('API Key is required (x-api-key header)');
        }

        if (apiKey !== validApiKey) {
            throw new UnauthorizedException('Invalid API Key');
        }

        return true;
    }
}
