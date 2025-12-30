import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesBrands } from '../../../shared/models/categories-brands';
import { Categories } from '../../../shared/models/categories';
import { UUID } from 'crypto';
import { ResourceService } from '../resource.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends ResourceService<Categories> {

  constructor() {
    super('categories');
  }

  getCategoriesWithBrands(): Observable<CategoriesBrands[]> {
    return this.get<CategoriesBrands[]>('brands');
  }

  getCategories(): Observable<Categories[]> {
    return this.get<Categories[]>('');
  }

  getCategoryById(id: UUID): Observable<Categories> {
    return this.getById<Categories>(id.toString());
  }
}
