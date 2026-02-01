import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { BasketStateService } from '../../core/services/cart/basket-state.service';
import { UiFeedbackService } from '../../core/services/ui-feedback.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartOrderSummaryComponent } from './cart-order-summary/cart-order-summary.component';
import { BasketItem } from '../../shared/models/basket';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, CartItemComponent, CartOrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  basketState = inject(BasketStateService);

  get basket() {
    return this.basketState.basket();
  }

  get basketItems() {
    return this.basketState.basketItems();
  }

  get basketTotal() {
    return this.basketState.basketTotal() - (this.basket?.discountValue || 0);
  }
  
  get discountInfo() {
      return {
          value: this.basket?.discountValue || 0,
          percentage: this.basket?.percentage || 0
      };
  }

  get subtotal() {
      return (this.basket?.total || 0);
  }

  private ui = inject(UiFeedbackService);

  increaseItem(item: BasketItem) {
    this.basketState.increaseItem(item.id);
  }

  async decreaseItem(item: BasketItem) {
    if (item.quantity > 1) {
      const confirmed = await this.ui.confirm(
        'Are you sure you want to decrease the quantity of this item?',
        'Confirm Action',
        'Yes, decrease',
        'Cancel',
        'warning'
      );
      if (confirmed) {
        this.basketState.decreaseItem(item.id);
      }
    } 
    else {
      const confirmed = await this.ui.confirm(
        'This is the last item. If you continue, the quantity will become zero and the item will be removed from your cart.',
        'Remove Item?',
        'Yes, remove it',
        'Cancel',
        'warning'
      );
      if (confirmed) {
        this.basketState.decreaseItem(item.id);
      }
    }
  }

  async removeItem(item: BasketItem) {
    const confirmed = await this.ui.confirm(
      'Are you sure you want to remove this item from your cart?',
      'Remove Item',
      'Yes, remove',
      'Cancel',
      'warning'
    );
    if (confirmed) {
      this.basketState.removeItem(item.id);
    }
  }

  applyDiscount(code: string) {
    this.basketState.applyDiscount(code).subscribe();
  }
}
