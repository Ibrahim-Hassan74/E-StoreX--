import { Component, input, output } from '@angular/core';
import { MobileLinksComponent } from '../mobile-links/mobile-links.component';
import { MobileLocationComponent } from '../mobile-location/mobile-location.component';
import { MobileActionsComponent } from '../mobile-actions/mobile-actions.component';
import { NavbarLogoComponent } from '../../desktop/navbar-logo/navbar-logo.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-mobile-menu',
  imports: [
    MobileLinksComponent,
    MobileLocationComponent,
    MobileActionsComponent,
    NavbarLogoComponent,
    LucideAngularModule
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  menuState = input.required<boolean>();
  closeMenu = output<void>();
}
