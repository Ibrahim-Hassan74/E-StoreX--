import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-social-links',
  imports: [LucideAngularModule],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent {
  links = input.required<{ icon: string; url: string; hoverClass: string }[]>();
}
