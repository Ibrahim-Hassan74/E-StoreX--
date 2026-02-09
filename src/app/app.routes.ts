import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { nonAuthGuard } from './core/guards/non-auth.guard';
import { productTitleResolver } from './core/resolvers/product-title.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home'
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./features/product/product-details/product-details.component').then(m => m.ProductDetailsComponent),
    title: productTitleResolver
  },
  {
    path: 'product',
    loadComponent: () => import('./features/product/product.component').then(m => m.ProductComponent),
    title: 'Products'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'About Us'
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us'
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent),
    title: 'Shopping Cart'
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent),
    title: 'Wishlist'
  },
  {
    path: 'auth',
    children: [
      { 
        path: 'login', 
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
        canActivate: [nonAuthGuard],
        title: 'Sign in'
      },
      { 
        path: 'register', 
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
        canActivate: [nonAuthGuard],
        title: 'Sign up'
      },
      { 
        path: 'forgot-password', 
        loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
        canActivate: [nonAuthGuard],
        title: 'Forgot Password'
      },
      { 
        path: 'reset-password', 
        loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
        canActivate: [nonAuthGuard],
        title: 'Reset Password'
      },
      {
        path: 'reset-password-success',
        loadComponent: () => import('./features/auth/reset-password-success/reset-password-success.component').then(m => m.ResetPasswordSuccessComponent),
        canActivate: [nonAuthGuard],
        title: 'Password Reset Successful'
      },
      {
        path: 'oauth-callback',
        loadComponent: () => import('./features/auth/oauth-callback/oauth-callback.component').then(m => m.OAuthCallbackComponent),
        canActivate: [nonAuthGuard],
        title: 'Authorizing...'
      },
      { 
        path: 'confirm-email', 
        loadComponent: () => import('./features/auth/confirm-email/confirm-email.component').then(m => m.ConfirmEmailComponent),
        canActivate: [nonAuthGuard],
        title: 'Confirm Email'
      },
    ]
    
  },
  {
    path: 'account',
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', 
        loadComponent: () => import('./features/account/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard],
        title: 'My Profile'
      }
    ]
  },
  {
    path: 'mobile-app',
    loadComponent: () => import('./features/downloads/downloads.component').then(m => m.DownloadsComponent),
    title: 'Download App'
  },
  {
    path: 'business',
    loadComponent: () => import('./features/business/business.component').then(m => m.BusinessComponent),
    title: 'Business'
  },
  {
    path: 'partners',
    loadComponent: () => import('./features/partners/partners.component').then(m => m.PartnersComponent),
    title: 'Partners'
  },
  {
    path: 'careers',
    loadComponent: () => import('./features/careers/careers.component').then(m => m.CareersComponent),
    title: 'Careers'
  },
  {
    path: 'help',
    loadComponent: () => import('./features/help/help.component').then(m => m.HelpComponent),
    title: 'Help Center'
  },
  {
    path: 'legal',
    loadComponent: () => import('./features/legal/legal.component').then(m => m.LegalComponent),
    title: 'Legal'
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [authGuard],
    title: 'Checkout'
  },
  {
    path: 'checkout/success',
    loadComponent: () => import('./features/checkout/components/order-success/order-success.component').then(m => m.OrderSuccessComponent),
    canActivate: [authGuard],
    title: 'Order Success'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    title: 'Page Not Found'
  }
];
