import { Injectable } from '@angular/core';
import { ResourceService } from '../resource.service';
import { Product } from '../../../shared/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService extends ResourceService<Product> {

  constructor() {
    super('Favourites');
  }

  getWishlist(): Observable<Product[]> {
    return this.get<Product[]>();
  }

  addToWishlist(productId: string): Observable<any> {
    return this.post(productId);
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.delete(productId);
  }
}
