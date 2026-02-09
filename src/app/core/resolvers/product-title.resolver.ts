import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { map, catchError, of } from 'rxjs';

export const productTitleResolver: ResolveFn<string> = (route, state) => {
  const productsService = inject(ProductsService);
  const id = route.paramMap.get('id');

  if (!id) {
    return 'Product Details';
  }

  return productsService.getProductById(id).pipe(
    map((product) => product.name),
    catchError(() => of('Product Details'))
  );
};
