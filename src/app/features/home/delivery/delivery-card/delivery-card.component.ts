import { Component, input, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DeliveryItem } from '../../../../shared/models/delivery-item';

@Component({
  selector: 'app-delivery-card',
  imports: [LucideAngularModule],
  templateUrl: './delivery-card.component.html',
  styleUrl: './delivery-card.component.scss',
})
export class DeliveryCardComponent {
  item = input.required<DeliveryItem>();
}
