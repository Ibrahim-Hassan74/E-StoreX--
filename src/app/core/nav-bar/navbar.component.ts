import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NavBarComponent {
  isDropdownOpen = signal(false);
  isMobileMenuOpen = signal(false);
  isLocationOpen = signal(false);

  toggleLocation() {
    this.isLocationOpen.update((l) => !l);
  }

  closeLocation() {
    this.isLocationOpen.set(false);
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.update((d) => !d);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((m) => !m);
  }
}
