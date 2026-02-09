import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { BrandsService } from '../../core/services/brands/brands.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Product } from '../../shared/models/product.model';
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
  private router = inject(Router);

  products = signal<Product[]>([]);
  pagination = signal<Pagination<Product> | null>(null);
  brands = signal<Brand[]>([]);
  categories = signal<Categories[]>([]);
  loading = signal<boolean>(false);
  isMobileFilterOpen = signal<boolean>(false);

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

          const totalCount = response?.totalCount || 0;
          const pageSize = this.query().pageSize || 12;
          const totalPages = Math.ceil(totalCount / pageSize);
          const currentPage = this.query().pageNumber || 1;

          if (currentPage > 1 && (totalCount === 0 || currentPage > totalPages)) {
            this.updateQuery({ pageNumber: 1 });
          }
        },
        error: () => {
          this.products.set([]);
        }
      });
  }

  updateQuery(changes: Partial<ProductQuery>) {
    const nextQuery = { ...this.query(), ...changes };
    const queryParams: any = {};
    
    if (nextQuery.searchString) queryParams.searchString = nextQuery.searchString;
    if (nextQuery.pageNumber && nextQuery.pageNumber > 1) queryParams.pageNumber = nextQuery.pageNumber;
    if (nextQuery.pageSize && nextQuery.pageSize !== 12) queryParams.pageSize = nextQuery.pageSize;
    if (nextQuery.minPrice) queryParams.minPrice = nextQuery.minPrice;
    if (nextQuery.maxPrice) queryParams.maxPrice = nextQuery.maxPrice;
    if (nextQuery.categoryId) queryParams.categoryId = nextQuery.categoryId;
    if (nextQuery.brandId) queryParams.brandId = nextQuery.brandId;
    if (nextQuery.sortBy) queryParams.sortBy = nextQuery.sortBy;
    if (nextQuery.sortOrder) queryParams.sortOrder = nextQuery.sortOrder;

    this.router.navigate([], { queryParams });
  }

  setQueryFromUrl(params: any) {
      const newQuery: ProductQuery = {
          pageNumber: Number(params['pageNumber']) || 1,
          pageSize: Number(params['pageSize']) || 12,
          searchString: params['searchString'] || '',
          minPrice: params['minPrice'] ? Number(params['minPrice']) : undefined,
          maxPrice: params['maxPrice'] ? Number(params['maxPrice']) : undefined,
          categoryId: params['categoryId'] || undefined,
          brandId: params['brandId'] || undefined,
          sortBy: params['sortBy'] || 'price',
          sortOrder: (params['sortOrder'] as SortOrderOptions) || SortOrderOptions.DESC
      };
      
      this.query.set(newQuery);
      this.loadProducts();
  }

  setSearch(val: string) {
    this.searchSubject.next(val);
  }

  clearSearch() {
      this.updateQuery({ searchString: '' });
      this.setSearch('');
  }


  resetFilters() {
    this.router.navigate([], { queryParams: {} });
    this.setSearch('');
  }
  
  toggleMobileFilters() {
      this.isMobileFilterOpen.update((v) => !v);
  }

  closeMobileFilters() {
      this.isMobileFilterOpen.set(false);
  }
}
