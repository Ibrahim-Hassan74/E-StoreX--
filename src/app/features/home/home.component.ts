import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../../shared/models/Product';
import { Pagination } from '../../shared/models/Pagination ';
import { Photo } from '../../shared/models/Photo';

interface Slide {
  title: string;
  category: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  photos: Photo[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  slides: Slide[] = [];
  isClient: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isClient = true;
    }
    this.http
      .get<Pagination>(`${environment.baseURL}/products/best-sellers?count=5`)
      .subscribe({
        next: (response: Pagination) => {
          console.log('Fetched slides:', response.data);
          this.slides = response.data.map((p: Product) => {
            return {
              title: p.name,
              category: p.categoryName,
              description: p.description,
              newPrice: p.newPrice,
              oldPrice: p.oldPrice,
              photos: p.photos,
            };
          });
        },
        error: (err) => console.error('Error fetching slides:', err),
      });
  }
}
