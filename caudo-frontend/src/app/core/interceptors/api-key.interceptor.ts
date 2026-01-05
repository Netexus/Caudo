import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
    // Skip if request is not to our API (optional check, but good practice)
    if (!req.url.startsWith(environment.apiUrl)) {
        return next(req);
    }

    const clonedReq = req.clone({
        headers: req.headers.set('x-api-key', environment.apiKey)
    });

    return next(clonedReq);
};
