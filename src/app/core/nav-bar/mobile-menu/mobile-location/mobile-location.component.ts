import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-mobile-location',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './mobile-location.component.html',
  styleUrl: './mobile-location.component.scss',
})
export class MobileLocationComponent {
  isLocationOpen = signal(false);
  toggleLocation() {
    this.isLocationOpen.update((l) => !l);
  }
  closeLocation() {
    this.isLocationOpen.set(false);
  }
}
