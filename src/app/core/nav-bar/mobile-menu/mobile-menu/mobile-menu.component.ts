import { Component, input } from '@angular/core';
import { MobileLinksComponent } from '../mobile-links/mobile-links.component';
import { MobileLocationComponent } from '../mobile-location/mobile-location.component';
import { MobileActionsComponent } from '../mobile-actions/mobile-actions.component';

@Component({
  selector: 'app-mobile-menu',
  imports: [
    MobileLinksComponent,
    MobileLocationComponent,
    MobileActionsComponent,
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  menuState = input.required<boolean>();
}
