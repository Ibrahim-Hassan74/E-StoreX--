import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { Product } from '../../../shared/models/product';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCardComponent {
  product = input.required<Product>();
  flipped = signal(false);
  private flipTimeout?: any;
  private destroyRef = inject(DestroyRef);
  static currentFlipped?: ProductCardComponent;
  onTouchStart(event: TouchEvent) {
    if (
      ProductCardComponent.currentFlipped &&
      ProductCardComponent.currentFlipped !== this
    ) {
      ProductCardComponent.currentFlipped.resetFlip();
    }
    this.flipped.set(true);
    ProductCardComponent.currentFlipped = this;

    if (this.flipTimeout) clearTimeout(this.flipTimeout);

    this.flipTimeout = setTimeout(() => {
      this.resetFlip();
    }, 3000);
    this.destroyRef.onDestroy(() => {
      if (this.flipTimeout) clearTimeout(this.flipTimeout);
    });
  }
  resetFlip() {
    this.flipped.set(false);
    if (this.flipTimeout) clearTimeout(this.flipTimeout);
    this.flipTimeout = undefined;
    if (ProductCardComponent.currentFlipped === this) {
      ProductCardComponent.currentFlipped = undefined;
    }
  }
}
