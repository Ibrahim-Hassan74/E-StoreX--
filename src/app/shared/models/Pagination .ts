import { Product } from './Product';

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  data: Product[];
}
