import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
} from '@angular/core';
import { CategoriesBrands } from '../../shared/models/categories-brands';
import { CategoryCardComponent } from './category-card/category-card.component';

@Component({
  selector: 'app-categories',
  imports: [CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriesComponent {
  categoriesBrands = input.required<CategoriesBrands[]>();
}
