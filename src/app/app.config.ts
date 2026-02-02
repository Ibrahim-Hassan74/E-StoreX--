import { AccountService } from './core/services/account/account.service';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  APP_INITIALIZER
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { lucideIconsConfig } from './core/configs/lucide-icons.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';

function initializeApp(accountService: AccountService) {
  return () => accountService.initializeUser();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(withInterceptors([apiKeyInterceptor, authInterceptor])),

    provideClientHydration(withEventReplay()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AccountService],
    },
    importProvidersFrom(lucideIconsConfig),
  ],
};
