import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { DeliveryComponent } from './delivery/delivery.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeBannerComponent, DeliveryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {}
