import { Component, CUSTOM_ELEMENTS_SCHEMA, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slide } from '../../../shared/models/slide';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-banner',
  imports: [CommonModule, RouterModule],
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeBannerComponent {
  slides = input.required<Slide[]>();
  // We can't easily compute 'shouldLoop' for the outer swiper because slides number is usually stable,
  // but let's add it for safety. The inner swiper (photos) definitely needs it.
  
  // Note: For the outer slider, we assume > 1 slides implies loop is okay, 
  // but if we only have 1 slide, loop should be false.
  shouldLoopSlides = computed(() => this.slides().length > 1);
}
