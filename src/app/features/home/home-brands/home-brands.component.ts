import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { Brand } from '../../../shared/models/brand';

@Component({
  selector: 'app-home-brands',
  imports: [],
  templateUrl: './home-brands.component.html',
  styleUrl: './home-brands.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeBrandsComponent {
  brands = input.required<Brand[]>();
  isClient = input.required<Boolean>();
}
