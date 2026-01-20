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

  ngAfterViewInit() {
    if(window === undefined) return;
    const swiper = this.swiperEl.nativeElement;
    swiper.initialize();
  }
}
