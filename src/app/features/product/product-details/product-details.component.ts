import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../shared/models/product';
import { RatingsComponent } from './ratings/ratings.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, RatingsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  product = signal<Product | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  
  selectedImage = signal<string | null>(null);
  quantity = signal<number>(1);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
    } else {
      this.error.set('Product not found');
      this.loading.set(false);
    }
  }

  loadProduct(id: string) {
    this.loading.set(true);
    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        if (product.photos && product.photos.length > 0) {
          this.selectedImage.set(product.photos[0].imageName);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load product details');
        this.loading.set(false);
      }
    });
  }

  setImage(image: string) {
    this.selectedImage.set(image);
  }

  incrementQuantity() {
    this.quantity.update(q => {
      const product = this.product();
      if (product && q < product.quantityAvailable) {
        return q + 1;
      }
      return q;
    });
  }

  decrementQuantity() {
    this.quantity.update(q => (q > 1 ? q - 1 : 1));
  }

  addToCart() {
    const product = this.product();
    if (!product) return;
    
    console.log('Adding to cart:', product.name, 'Quantity:', this.quantity());
    alert(`Added ${this.quantity()} x ${product.name} to cart (Simulated)`);
  }

  addToWishlist() {
    const product = this.product();
    if (!product) return;

    console.log('Adding to wishlist:', product.name);
    alert(`Added ${product.name} to wishlist (Simulated)`);
  }

  getImageUrl(path: string | undefined): string {
    if (!path) return '';
    const cleanPath = path.replace(/\\/g, '/');
    return `https://estorex.runasp.net/${cleanPath}`;
  }
}
