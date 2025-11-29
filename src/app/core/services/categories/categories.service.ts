import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CategoriesBrands } from '../../../shared/models/categories-brands';
import { Categories } from '../../../shared/models/categories';
import { UUID } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);
  private url = environment.baseURL + 'categories';
  getCategoriesWithBrands(): Observable<CategoriesBrands[]> {
    return this.http.get<CategoriesBrands[]>(`${this.url}/brands`);
  }
  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.url}`);
  }
  getCategoryById(id: UUID): Observable<Categories> {
    return this.http.get<Categories>(`${this.url}/${id}`);
  }
  
}
