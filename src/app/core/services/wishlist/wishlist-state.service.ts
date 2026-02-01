import { computed, inject, Injectable, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from './wishlist.service';
import { UiFeedbackService } from '../ui-feedback.service';
import { Product } from '../../../shared/models/product';
import { AccountService } from '../../services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistStateService {
  private wishlistService = inject(WishlistService);
  private ui = inject(UiFeedbackService);
  private accountService = inject(AccountService);
  private router = inject(Router);

  private wishlistSignal = signal<Product[]>([]);

  wishlist = computed(() => this.wishlistSignal());
  wishlistIds = computed(() => new Set(this.wishlistSignal().map(p => p.id)));
  isLoading = signal<boolean>(false);

  constructor() {
    effect(() => {
      const user = this.accountService.currentUser();
      if (user) {
        this.loadWishlist();
      } else {
        this.wishlistSignal.set([]);
      }
    });
  }

  loadWishlist() {
    this.isLoading.set(true);
    this.wishlistService.getWishlist().subscribe({
      next: (products) => {
        this.wishlistSignal.set(products);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load wishlist', err);
        this.isLoading.set(false);
      }
    });
  }

  toggleWishlist(product: Product) {
    if (!this.accountService.currentUser()) {
      this.ui.confirm(
        'Please log in to add items to your wishlist',
        'Login Required',
        'Login',
        'Cancel',
        'info'
      ).then((confirmed) => {
        if (confirmed) {
          this.router.navigate(['/auth/login']);
        }
      });
      return;
    }

    const isInWishlist = this.wishlistIds().has(product.id);

    if (isInWishlist) {
      this.wishlistService.removeFromWishlist(product.id).subscribe({
        next: () => {
          this.wishlistSignal.update(list => list.filter(p => p.id !== product.id));
          this.ui.success('Item removed from wishlist', 'Removed');
        },
        error: (err) => this.ui.error(err.error?.message || 'Failed to remove from wishlist')
      });
    } else {
      this.wishlistService.addToWishlist(product.id).subscribe({
        next: () => {
          this.wishlistSignal.update(list => [...list, product]);
          this.ui.success('Item added to wishlist', 'Added');
        },
        error: (err) => this.ui.error(err.error?.message || 'Failed to add to wishlist')
      });
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistIds().has(productId);
  }
}
