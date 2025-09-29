import { Component, input, signal } from '@angular/core';
import { DeliveryItem } from '../../../shared/models/delivery-item';
import { DeliveryCardComponent } from './delivery-card/delivery-card.component';

@Component({
  selector: 'app-delivery',
  imports: [DeliveryCardComponent],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
})
export class DeliveryComponent {
  isClient = input.required<Boolean>();
  deliveryItems = signal<DeliveryItem[]>([
    {
      iconName: 'percent',
      title: 'Discount',
      description: 'Every week new sales',
    },
    {
      iconName: 'truck',
      title: 'Free Delivery',
      description: '100% Free for a specific amount',
    },
    {
      iconName: 'clock-3',
      title: 'Great Support 24/7',
      description: 'We care about your experiences',
    },
    {
      iconName: 'shield-check',
      title: 'Secure Payment',
      description: '100% Secure Payment Method',
    },
  ]);
}
