import { Component, CUSTOM_ELEMENTS_SCHEMA, input, computed } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductCardComponent } from '../../product/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home-featured-products',
  imports: [ProductCardComponent, CommonModule, LucideAngularModule],
  templateUrl: './home-featured-products.component.html',
  styleUrl: './home-featured-products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeFeaturedProductsComponent {
  featuredProducts = input.required<Product[]>();
  // Max slidesPerView is 6, so we only loop if we have more than 6 items
  shouldLoop = computed(() => this.featuredProducts().length > 6);
}
