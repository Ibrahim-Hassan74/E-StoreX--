import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductCardComponent } from '../../product/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-featured-products',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './home-featured-products.component.html',
  styleUrl: './home-featured-products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeFeaturedProductsComponent {
  featuredProducts = input.required<Product[]>();
}
