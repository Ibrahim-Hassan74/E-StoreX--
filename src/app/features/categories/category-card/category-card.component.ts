import { Component, CUSTOM_ELEMENTS_SCHEMA, input, computed } from '@angular/core';
import { CategoriesBrands } from '../../../shared/models/categories-brands';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [RouterModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoryCardComponent {
  cat = input.required<CategoriesBrands>();
  shouldLoop = computed(() => (this.cat().brandResponse?.length || 0) > 4);
}
