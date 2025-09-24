import { Component, signal, ViewEncapsulation } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { MobileMenuComponent } from './mobile-menu/mobile-menu/mobile-menu.component';
import { NavbarLogoComponent } from './desktop/navbar-logo/navbar-logo.component';
import { NavbarLocationComponent } from './desktop/navbar-location/navbar-location.component';
import { NavbarLinksComponent } from './desktop/navbar-links/navbar-links.component';
import { NavbarActionsComponent } from './desktop/navbar-actions/navbar-actions.component';

@Component({
  selector: 'app-navbar',
  imports: [
    LucideAngularModule,
    MobileMenuComponent,
    NavbarLogoComponent,
    NavbarLocationComponent,
    NavbarLinksComponent,
    NavbarActionsComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NavBarComponent {
  isMobileMenuOpen = signal(false);
  toggleMobileMenu() {
    this.isMobileMenuOpen.update((m) => !m);
  }
}
