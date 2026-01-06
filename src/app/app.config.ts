import { AccountService } from './core/services/account/account.service';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  APP_INITIALIZER
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
  Loader2,
  Chrome,
  LogOut,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';

function initializeApp(accountService: AccountService) {
  return () => accountService.initializeUser();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiKeyInterceptor, authInterceptor])),

    provideClientHydration(withEventReplay()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AccountService],
    },
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
        Loader2,
        Chrome,
        LogOut,
        Filter,
        ChevronLeft,
        ChevronRight
      })
    ),
  ],
};
