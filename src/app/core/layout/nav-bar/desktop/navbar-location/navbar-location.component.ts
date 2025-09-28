import { Component, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar-location',
  imports: [LucideAngularModule],
  templateUrl: './navbar-location.component.html',
  styleUrl: './navbar-location.component.scss',
})
export class NavbarLocationComponent {
  isLocationOpen = signal(false);
  toggleLocation() {
    this.isLocationOpen.update((l) => !l);
  }
  closeLocation() {
    this.isLocationOpen.set(false);
  }
}
