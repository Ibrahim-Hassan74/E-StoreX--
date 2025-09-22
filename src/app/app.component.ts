import { Component, computed, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/nav-bar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  value: WritableSignal<number> = signal(0);
  calcSignal = computed(() => this.value() * 2);
  onClick() {
    // this.value.update((x) => x + 1);
    this.value.set(this.value() + 1);
  }
}
