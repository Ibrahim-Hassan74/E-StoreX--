import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProductQuery } from '../../../shared/models/product-query';
import { map, Observable } from 'rxjs';
import { Pagination } from '../../../shared/models/pagination';
import { Product } from '../../../shared/models/Product';
import { Slide } from '../../../shared/models/Slide';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = environment.baseURL + 'products';

  getProducts(query: ProductQuery = {}): Observable<Pagination<Product>> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return this.http.get<Pagination<Product>>(this.apiUrl, { params });
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  getBestSeller(count: number): Observable<Pagination<Product>> {
    const params = new HttpParams().set('count', count.toString());
    return this.http.get<Pagination<Product>>(`${this.apiUrl}/best-sellers`, {
      params,
    });
  }
  getBestSellerSlides(count: number): Observable<Slide[]> {
    return this.getBestSeller(count).pipe(
      map((response) =>
        response.data.map((p: Product) => ({
          title: p.name,
          category: p.categoryName,
          description: p.description,
          newPrice: p.newPrice,
          oldPrice: p.oldPrice,
          photos: p.photos,
        }))
      )
    );
  }
}
