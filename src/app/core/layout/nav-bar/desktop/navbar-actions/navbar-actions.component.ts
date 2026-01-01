import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { NavbarService } from '../../navbar.service';
import { AccountService } from '../../../../services/account/account.service';

@Component({
  selector: 'app-navbar-actions',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-actions.component.html',
  styleUrl: './navbar-actions.component.scss',
})
export class NavbarActionsComponent {
  isDropdownOpen = signal(false);
  private navbarService = inject(NavbarService);
  private accountService = inject(AccountService);
  private router = inject(Router);

  isDarkMode = this.navbarService.mode;
  currentUser = this.accountService.currentUser;

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

  logout() {
    this.accountService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
    this.closeDropdown();
  }
}
