import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FooterColumnComponent } from './footer-column/footer-column.component';
import { RouterLink } from '@angular/router';
import { SocialLinksComponent } from './social-links/social-links.component';

@Component({
  selector: 'app-footer',
  imports: [
    LucideAngularModule,
    FooterColumnComponent,
    RouterLink,
    SocialLinksComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  email = 'ibrahimhassan@estorex.com';
  currentYear: number = new Date().getFullYear();
  resources = [
    { label: 'Product catalog', route: '/products' },
    { label: 'Help center', route: '/help' },
    { label: 'Privacy & terms', route: '/privacy' },
  ];
  company = [
    { label: 'About', route: '/about' },
    { label: 'For Business', route: '/business' },
    { label: 'Partners', route: '/partners' },
    { label: 'Careers', route: '/careers' },
  ];
  account = [
    { label: 'Create account', route: '/register' },
    { label: 'Sign in', route: '/login' },
    { label: 'iOS app', route: '/ios-app' },
    { label: 'Android app', route: '/android-app' },
  ];
  socialLinks = [
    {
      icon: 'instagram',
      url: 'https://www.instagram.com/ibrahim_hassan_72',
      hoverClass: 'text-pink-500 dark:hover:text-pink-400',
    },
    {
      icon: 'facebook',
      url: 'https://web.facebook.com/ibrahim.hassan.309765',
      hoverClass: 'text-blue-600 dark:hover:text-blue-400',
    },
    {
      icon: 'twitter',
      url: 'https://x.com/hema_official1',
      hoverClass: 'text-sky-500 dark:hover:text-sky-400',
    },
    {
      icon: 'github',
      url: 'https://github.com/Ibrahim-Hassan74',
      hoverClass: 'text-gray-900 dark:hover:text-gray-200',
    },
  ];
}
