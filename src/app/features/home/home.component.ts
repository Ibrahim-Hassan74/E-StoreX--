import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { HomeBrandsComponent } from './home-brands/home-brands.component';
import { forkJoin } from 'rxjs';
import { ProductsService } from '../../core/services/products/products.service';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Slide } from '../../shared/models/slide';
import { Brand } from '../../shared/models/brand';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Product } from '../../shared/models/product';
import { HomeFeaturedProductsComponent } from './home-featured-products/home-featured-products.component';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CategoriesBrands } from '../../shared/models/categories-brands';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeBannerComponent,
    DeliveryComponent,
    HomeBrandsComponent,
    LoadingSpinnerComponent,
    HomeFeaturedProductsComponent,
    CategoriesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  isLoading = signal(true);
  bannerData = signal<Slide[]>([]);
  brandsData = signal<Brand[]>([]);
  featuredProducts = signal<Product[]>([]);
  categoriesBrands = signal<CategoriesBrands[]>([]);
  private productsService = inject(ProductsService);
  private brandsService = inject(BrandsService);
  private categoriesService = inject(CategoriesService);
  ngOnInit(): void {
    this.isLoading.set(true);
    forkJoin({
      banner: this.productsService.getBestSellerSlides(5),
      brands: this.brandsService.getBrands(),
      featured: this.productsService.getFeaturedProducts(),
      categoriesBrands: this.categoriesService.getCategoriesWithBrands(),
    }).subscribe({
      next: (res) => {
        this.bannerData.set(res.banner);
        this.brandsData.set(res.brands);
        this.featuredProducts.set(res.featured);
        this.categoriesBrands.set(res.categoriesBrands);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(true);
      },
    });
  }
}
