import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '../services/config.service';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const configService = inject(ConfigService);
  const api = configService.apiKey;
  if (!api) {
    return next(req);
  }
  const cloned = req.clone({
    setHeaders: {
      'X-API-KEY': api,
    },
  });
  return next(cloned);
};
