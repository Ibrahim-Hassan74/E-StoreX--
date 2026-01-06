import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortOrderOptions } from '../../../../shared/enums/sort-order.enum';
import { ProductStateService } from '../../product.state';

@Component({
  selector: 'app-products-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-toolbar.component.html'
})
export class ProductsToolbarComponent {
  state = inject(ProductStateService);

  sortOptions = [
    { label: 'Price (High-Low)', value: 'price', order: SortOrderOptions.DESC },
    { label: 'Price (Low-High)', value: 'price', order: SortOrderOptions.ASC },
    { label: 'Name (A-Z)', value: 'name', order: SortOrderOptions.ASC },
    { label: 'Name (Z-A)', value: 'name', order: SortOrderOptions.DESC },
  ];

  get sortValue(): string {
     return (this.state.query().sortBy || 'price') + '-' + (this.state.query().sortOrder || SortOrderOptions.DESC);
  }

  onPageSizeChange(size: number | string) {
    this.state.updateQuery({ pageSize: Number(size), pageNumber: 1 });
  }

  onSortChange(value: string) {
    const selected = this.sortOptions.find(opt => opt.value + '-' + opt.order === value);
    if (selected) {
      this.state.updateQuery({ 
          sortBy: selected.value, 
          sortOrder: selected.order,
          pageNumber: 1
      });
    }
  }
}
