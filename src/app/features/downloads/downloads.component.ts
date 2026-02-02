import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.scss'
})
export class DownloadsComponent {

}
