import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductQuery } from '../../../shared/models/product-query';
import { Pagination } from '../../../shared/models/pagination';
import { Slide } from '../../../shared/models/slide';
import { Product } from '../../../shared/models/product';
import { ResourceService } from '../resource.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ResourceService<Product> {

  constructor() {
    super('products');
  }

getProducts(query: ProductQuery = {}): Observable<Pagination<Product>> {
  let params = new HttpParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params = params.set(key, value.toString());
    }
  });

  return this.get<Pagination<Product>>('', { params });
}

  getProductById(id: string): Observable<Product> {
    return this.getById<Product>(id);
  }

  getBestSeller(count: number): Observable<Pagination<Product>> {
    return this.get<Pagination<Product>>('best-sellers', {
      params: { count },
    });
  }

  getBestSellerSlides(count: number): Observable<Slide[]> {
    return this.getBestSeller(count).pipe(
      map((response) =>
        response.data.map((p: Product) => ({
          id: p.id,
          title: p.name,
          category: p.categoryName,
          description: p.description,
          newPrice: p.newPrice,
          oldPrice: p.oldPrice,
          photos: p.photos,
        })),
      ),
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.get<Product[]>('featured');
  }
}
