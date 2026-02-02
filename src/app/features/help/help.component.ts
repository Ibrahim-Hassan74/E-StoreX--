import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {

}
