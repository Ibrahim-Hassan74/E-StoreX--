import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slide } from '../../../shared/models/slide';

@Component({
  selector: 'app-home-banner',
  imports: [CommonModule],
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeBannerComponent {
  slides = input.required<Slide[]>();
  isClient = input.required<boolean>();
}
