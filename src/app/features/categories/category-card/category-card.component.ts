import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { CategoriesBrands } from '../../../shared/models/categories-brands';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoryCardComponent {
  cat = input.required<CategoriesBrands>();
}
