import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-mobile-links',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './mobile-links.component.html',
  styleUrl: './mobile-links.component.scss',
})
export class MobileLinksComponent {}
