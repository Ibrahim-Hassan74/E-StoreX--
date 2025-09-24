import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar-actions',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-actions.component.html',
  styleUrl: './navbar-actions.component.scss',
})
export class NavbarActionsComponent {
  isDropdownOpen = signal(false);
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.update((d) => !d);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }
}
