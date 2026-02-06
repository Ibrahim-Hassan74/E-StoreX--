import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketStateService } from '../../../../core/services/cart/basket-state.service';
import { CheckoutService } from '../../../../core/services/checkout/checkout.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent {
  basketState = inject(BasketStateService);
  checkoutService = inject(CheckoutService);
}
