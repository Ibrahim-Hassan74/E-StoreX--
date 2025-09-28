import { HttpClient } from '@angular/common/http';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Slide } from '../../../shared/models/Slide';
import { Product } from '../../../shared/models/Product';
import { Pagination } from '../../../shared/models/pagination';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-home-banner',
  imports: [CommonModule],
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeBannerComponent implements OnInit {
  slides = signal<Slide[]>([]);
  isClient = signal<boolean>(false);
  private productsService = inject(ProductsService);

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isClient.set(true);
    }
    this.productsService.getBestSellerSlides(5).subscribe({
      next: (slides) => this.slides.set(slides),
      error: (err) => console.error(err),
    });
  }
}
