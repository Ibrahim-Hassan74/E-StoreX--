import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Brand } from '../../../shared/models/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private http = inject(HttpClient);
  private apiUrl = environment.baseURL + 'brands';
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }
  getBrandsById(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/${id}`);
  }
  getBrandsByName(name: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/by-name/${name}`);
  }
}
