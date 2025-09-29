import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/layout/nav-bar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isClient = signal<Boolean>(false);
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isClient.set(true);
    }
  }
}
