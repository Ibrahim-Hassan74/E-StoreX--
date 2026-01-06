import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ProductsFiltersComponent } from '../products-filters/products-filters.component';
import { ProductStateService } from '../../product.state';

@Component({
  selector: 'app-mobile-filters-drawer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ProductsFiltersComponent],
  templateUrl: './mobile-filters-drawer.component.html'
})
export class MobileFiltersDrawerComponent {
  state = inject(ProductStateService);
}
