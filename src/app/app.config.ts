import { AccountService } from './core/services/account/account.service';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  APP_INITIALIZER
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, TitleStrategy } from '@angular/router';
import { routes } from './app.routes';
import { PageTitleStrategy } from './core/strategies/page-title.strategy';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { lucideIconsConfig } from './core/configs/lucide-icons.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';

import { transferStateInterceptor } from './core/interceptors/transfer-state.interceptor';

function initializeApp(accountService: AccountService) {
  return () => accountService.initializeUser();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(withInterceptors([apiKeyInterceptor, authInterceptor, transferStateInterceptor])),

    provideClientHydration(withEventReplay()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AccountService],
    },
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategy,
    },
    importProvidersFrom(lucideIconsConfig),
  ],
};
