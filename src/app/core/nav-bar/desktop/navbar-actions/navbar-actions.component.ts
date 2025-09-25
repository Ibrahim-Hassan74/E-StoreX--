import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { NavbarService } from '../../navbar.service';

@Component({
  selector: 'app-navbar-actions',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-actions.component.html',
  styleUrl: './navbar-actions.component.scss',
})
export class NavbarActionsComponent {
  isDropdownOpen = signal(false);
  private navbarService = inject(NavbarService);
  isDarkMode = this.navbarService.mode;

  ngOnInit() {
    this.navbarService.load();
  }

  toggleTheme() {
    this.navbarService.toggleTheme();
  }
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.update((d) => !d);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }
}
