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
  Clock3,
  Crosshair,
  Facebook,
  Github,
  Heart,
  Info,
  Instagram,
  LucideAngularModule,
  MapPin,
  Menu,
  Moon,
  Percent,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Sun,
  Truck,
  Twitter,
  User,
  X,
} from 'lucide-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
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
        Clock3,
        Percent,
        ShieldCheck,
        Truck,
        Instagram,
        Facebook,
        Twitter,
        Github,
        Star,
      })
    ),
  ],
};
