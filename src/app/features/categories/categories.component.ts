import { HttpClient } from '@angular/common/http';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CategoriesBrands } from '../../shared/models/categories-brands';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriesComponent implements OnInit {
  private http = inject(HttpClient);
  categoriesBrands = signal<CategoriesBrands[]>([]);
  private url = environment.baseURL + 'categories';
  ngOnInit(): void {
    this.http.get<CategoriesBrands[]>(`${this.url}/brands`).subscribe({
      next: (res: CategoriesBrands[]) => {
        console.log(res);
        this.categoriesBrands.set(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
