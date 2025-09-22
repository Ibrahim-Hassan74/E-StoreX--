import {
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
  Search,
  ShoppingCart,
  User,
  X,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
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
      })
    ),
  ],
};
