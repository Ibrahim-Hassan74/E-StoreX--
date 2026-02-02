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
import { WishlistStateService } from '../../../core/services/wishlist/wishlist-state.service';
import { computed } from '@angular/core';
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
  private wishlistState = inject(WishlistStateService);

  isInWishlist = computed(() => this.wishlistState.isInWishlist(this.product().id));
  shouldLoop = computed(() => this.product().photos.length > 1);

  addToCart(event: Event) {
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

  toggleWishlist(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.wishlistState.toggleWishlist(this.product());
  }

  ngAfterViewInit() {
    if(window === undefined) return;
    const swiper = this.swiperEl.nativeElement;
    swiper.initialize();
  }
}
