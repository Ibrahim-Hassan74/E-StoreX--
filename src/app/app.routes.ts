import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { nonAuthGuard } from './core/guards/non-auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./features/product/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  },
  {
    path: 'product',
    loadComponent: () => import('./features/product/product.component').then(m => m.ProductComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent)
  },
  {
    path: 'auth',
    children: [
      { 
        path: 'login', 
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
        canActivate: [nonAuthGuard]
      },
      { 
        path: 'register', 
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
        canActivate: [nonAuthGuard]
      },
      { path: 'forgot-password', loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
      { path: 'reset-password', loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
      { path: 'confirm-email', loadComponent: () => import('./features/auth/confirm-email/confirm-email.component').then(m => m.ConfirmEmailComponent) },
    ]

  },
  {
    path: 'account',
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', 
        loadComponent: () => import('./features/account/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: 'mobile-app',
    loadComponent: () => import('./features/downloads/downloads.component').then(m => m.DownloadsComponent)
  },
  {
    path: 'business',
    loadComponent: () => import('./features/business/business.component').then(m => m.BusinessComponent)
  },
  {
    path: 'partners',
    loadComponent: () => import('./features/partners/partners.component').then(m => m.PartnersComponent)
  },
  {
    path: 'careers',
    loadComponent: () => import('./features/careers/careers.component').then(m => m.CareersComponent)
  },
  {
    path: 'help',
    loadComponent: () => import('./features/help/help.component').then(m => m.HelpComponent)
  },
  {
    path: 'legal',
    loadComponent: () => import('./features/legal/legal.component').then(m => m.LegalComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
