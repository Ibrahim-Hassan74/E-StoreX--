import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  Armchair,
  Check,
  ChevronDown,
  Crosshair,
  Heart,
  Info,
  LucideAngularModule,
  MapPin,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  User,
  X,
} from 'lucide-angular';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiKeyInterceptor])),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      LucideAngularModule.pick({
        Menu,
        Search,
        User,
        ShoppingCart,
        Heart,
        Info,
        Check,
        Armchair,
        MapPin,
        X,
        Crosshair,
        ChevronDown,
        Sun,
        Moon,
      })
    ),
  ],
};
