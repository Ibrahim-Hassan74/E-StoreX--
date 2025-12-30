import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../../shared/models/brand';
import { ResourceService } from '../resource.service';

@Injectable({
  providedIn: 'root',
})
export class BrandsService extends ResourceService<Brand> {

  constructor() {
    super('brands');
  }

  getBrands(): Observable<Brand[]> {
    return this.get<Brand[]>();
  }

  getBrandsById(id: string): Observable<Brand> {
    return this.getById<Brand>(id);
  }

  getBrandsByName(name: string): Observable<Brand> {
    return this.get<Brand>(`by-name/${name}`);
  }
}
