import { Component, CUSTOM_ELEMENTS_SCHEMA, input, computed } from '@angular/core';
import { Brand } from '../../../shared/models/brand';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-brands',
  imports: [RouterModule],
  templateUrl: './home-brands.component.html',
  styleUrl: './home-brands.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeBrandsComponent {
  brands = input.required<Brand[]>();
  // Max slidesPerView is 6, so we only loop if we have more than 6 items
  shouldLoop = computed(() => this.brands().length > 6);
}
