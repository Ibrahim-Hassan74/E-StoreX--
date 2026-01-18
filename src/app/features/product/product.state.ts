import { Injectable, inject, signal, computed } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { BrandsService } from '../../core/services/brands/brands.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Product } from '../../shared/models/product';
import { Brand } from '../../shared/models/brand';
import { Categories } from '../../shared/models/categories';
import { ProductQuery } from '../../shared/models/product-query';
import { Pagination } from '../../shared/models/pagination';
import { SortOrderOptions } from '../../shared/enums/sort-order.enum';
import { Subject, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class ProductStateService {
  private productsService = inject(ProductsService);
  private brandsService = inject(BrandsService);
  private categoriesService = inject(CategoriesService);

  // State Signals
  products = signal<Product[]>([]);
  pagination = signal<Pagination<Product> | null>(null);
  brands = signal<Brand[]>([]);
  categories = signal<Categories[]>([]);
  loading = signal<boolean>(false);
  isMobileFilterOpen = signal<boolean>(false);

  // Query Signal
  query = signal<ProductQuery>({
    pageNumber: 1,
    pageSize: 12,
    searchString: '',
    minPrice: undefined,
    maxPrice: undefined,
    categoryId: undefined,
    brandId: undefined,
    sortBy: 'price',
    sortOrder: SortOrderOptions.DESC,
  });

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe((val) => {
        this.updateQuery({ searchString: val, pageNumber: 1 });
      });
  }

  initialize() {
    this.loadProducts();
    this.brandsService.getBrands().subscribe((data) => this.brands.set(data));
    this.categoriesService.getCategories().subscribe((data) => this.categories.set(data));
  }

  loadProducts() {
    this.loading.set(true);
    this.productsService.getProducts(this.query())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response: Pagination<Product>) => {
          this.products.set(response?.data || []);
          this.pagination.set(response);
        },
        error: () => {
          this.products.set([]);
        }
      });
  }

  updateQuery(changes: Partial<ProductQuery>) {
    this.query.update((current) => ({ ...current, ...changes }));
    this.loadProducts();
  }

  setSearch(val: string) {
    this.searchSubject.next(val);
  }

  clearSearch() {
      this.query.update((q) => ({ ...q, searchString: '' }));
      this.setSearch('');
  }

  resetFilters() {
    this.query.set({
      pageNumber: 1,
      pageSize: 12,
      sortBy: 'price',
      sortOrder: SortOrderOptions.DESC,
      searchString: '',
      minPrice: undefined,
      maxPrice: undefined,
      categoryId: undefined,
      brandId: undefined,
    });
    this.setSearch('');
    this.loadProducts();
  }
  
  toggleMobileFilters() {
      this.isMobileFilterOpen.update((v) => !v);
  }

  closeMobileFilters() {
      this.isMobileFilterOpen.set(false);
  }
}
