import { Component, inject, signal, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { NavbarService } from '../../navbar.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../../../services/account/account.service';
import { BasketStateService } from '../../../../services/cart/basket-state.service';

@Component({
  selector: 'app-mobile-actions',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './mobile-actions.component.html',
  styleUrl: './mobile-actions.component.scss',
})
export class MobileActionsComponent {
  private navbarService = inject(NavbarService);
  private accountService = inject(AccountService);
  private basketState = inject(BasketStateService);
  private router = inject(Router);
  
  closeMenu = output<void>();

  isDarkMode = this.navbarService.mode;
  currentUser = this.accountService.currentUser;
  basketCount = this.basketState.basketCount;

  ngOnInit() {
    this.navbarService.load();
  }

  toggleTheme() {
    this.navbarService.toggleTheme();
  }

  logout() {
    this.accountService.logout().subscribe(() => {
      this.router.navigate(['/']);
      this.closeMenu.emit();
    });
  }
}
