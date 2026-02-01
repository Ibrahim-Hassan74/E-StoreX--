import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { Product } from '../../../shared/models/product';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasketStateService } from '../../../core/services/cart/basket-state.service';
import { BasketItem } from '../../../shared/models/basket';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCardComponent {
  product = input.required<Product>();

  @ViewChild('swiperEl', { static: true }) swiperEl!: ElementRef;

  private basketState = inject(BasketStateService);

  addToCart(event: Event) {
    // Event propagation handled in template
    const product = this.product();
    const item: BasketItem = {
      id: product.id,
      name: product.name,
      description: product.description,
      quantity: 1,
      price: product.newPrice,
      category: product.categoryName,
      image: 'https://estorex.runasp.net/' + (product.photos[0]?.imageName || '')
    };
    
    this.basketState.addItem(item);
  }

  ngAfterViewInit() {
    if(window === undefined) return;
    const swiper = this.swiperEl.nativeElement;
    swiper.initialize();
  }
}
