import { SearchByOptions } from '../enums/search-by-options.enum';
import { SortOrderOptions } from '../enums/sort-order.enum';

export interface ProductQuery {
  searchBy?: SearchByOptions;
  searchString?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  brandId?: string;
  sortBy?: string;
  sortOrder?: SortOrderOptions;
  pageNumber?: number;
  pageSize?: number;
}
