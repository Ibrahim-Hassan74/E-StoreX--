import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  mode = signal(false); // false for light, true for dark
  load() {
    // if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    this.mode.set(savedTheme === 'dark');

    if (this.mode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // }
  }

  toggleTheme() {
    // if (typeof window === 'undefined') return;
    this.mode.update((x) => !x);
    if (this.mode()) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
