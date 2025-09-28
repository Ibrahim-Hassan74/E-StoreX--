import { Component, inject, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { NavbarService } from '../../navbar.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-actions',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './mobile-actions.component.html',
  styleUrl: './mobile-actions.component.scss',
})
export class MobileActionsComponent {
  private navbarService = inject(NavbarService);
  isDarkMode = this.navbarService.mode;
  ngOnInit() {
    this.navbarService.load();
  }

  toggleTheme() {
    this.navbarService.toggleTheme();
  }
}
