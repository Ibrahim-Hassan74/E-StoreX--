import { computed, inject, Injectable, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Basket, BasketItem } from '../../../shared/models/basket';
import { BasketService } from './basket.service';
import { of, tap } from 'rxjs';
import { AccountService } from '../../services/account/account.service';
import { UiFeedbackService } from '../ui-feedback.service';

@Injectable({
  providedIn: 'root',
})
export class BasketStateService {
  private basketService = inject(BasketService);
  private accountService = inject(AccountService);
  private ui = inject(UiFeedbackService);
  private platformId = inject(PLATFORM_ID);

  private basketSignal = signal<Basket | null>(null);

  basket = computed(() => this.basketSignal());
  basketCount = computed(() =>
    this.basketSignal()?.basketItems?.reduce((acc, item) => acc + item.quantity, 0) ?? 0
  );
  basketTotal = computed(() => this.basketSignal()?.total ?? 0);
  basketItems = computed(() => this.basketSignal()?.basketItems ?? []);

  constructor() {
    effect(() => {
        const user = this.accountService.currentUser();
        if (user) {
            this.handleAuthUser();
        } else {
            this.handleGuestUser();
        }
    });
  }

  private get guestBasketId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('guestBasketId');
    }
    return null;
  }

  private set guestBasketId(id: string | null) {
    if (isPlatformBrowser(this.platformId)) {
      if (id) {
        localStorage.setItem('guestBasketId', id);
      } else {
        localStorage.removeItem('guestBasketId');
      }
    }
  }

  private handleAuthUser() {
      const guestId = this.guestBasketId;
      if (guestId) {
          this.basketService.mergeBasket(guestId).subscribe({
              next: (basket) => {
                  this.basketSignal.set(basket);
                  this.guestBasketId = null;
                  if (basket) {
                    this.persistAuthBasketId(basket.id);
                  }
              },
              error: () => {
                  this.loadAuthBasket();
              }
          });
      } else {
          this.loadAuthBasket();
      }
  }

  private loadAuthBasket() {
      if (!isPlatformBrowser(this.platformId)) {
          this.basketSignal.set(null);
          return;
      }

      const persistedId = localStorage.getItem('basketId');
      
       if (persistedId) {
          this.basketService.getBasket(persistedId).subscribe({
              next: (basket) => {
                 this.basketSignal.set(basket);
                 if (basket) {
                    this.persistAuthBasketId(basket.id);
                 }
              },
              error: () => {
                  this.basketSignal.set(null);
                  localStorage.removeItem('basketId'); // Clear invalid ID
              }
          });
      } else {
          this.basketSignal.set(null);
      }
  }

  private handleGuestUser() {
      if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('basketId');
      }
      
      const guestId = this.guestBasketId;
      if (guestId) {
          this.basketService.getBasket(guestId).subscribe({
              next: (basket) => this.basketSignal.set(basket),
              error: () => {
                  this.guestBasketId = null;
                  this.basketSignal.set(null);
              }
          });
      } else {
          this.basketSignal.set(null);
      }
  }
  
  private persistAuthBasketId(id: string) {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('basketId', id);
      }
  }

  addItem(item: BasketItem) {
    const user = this.accountService.currentUser();
    let basketId = this.basketSignal()?.id;
    
    if (!basketId) {
        if (user) {
             const stored = isPlatformBrowser(this.platformId) ? localStorage.getItem('basketId') : null;
             basketId = stored ?? this.createUUID();
        } else {
             basketId = this.guestBasketId ?? this.createUUID();
        }
    }

    if (!user && basketId !== this.guestBasketId) {
        this.guestBasketId = basketId;
    }

    this.basketService.addBasket(item, basketId).subscribe({
      next: (basket) => {
        this.basketSignal.set(basket);
        if (user) {
             this.persistAuthBasketId(basket.id);
        } else {
             this.guestBasketId = basket.id;
        }
        this.ui.success('The item has been added to your cart successfully.', 'Added to Cart');
      },
      error: (err) => {
          console.error('AddItem Error:', err);
          this.ui.error(err.error?.message || 'Failed to add item to cart');
      }
    });
  }

  private createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  removeItem(itemId: string) {
      const id = this.basketSignal()?.id;
      if (!id) return;
      this.basketService.removeItem(id, itemId).subscribe({
          next: b => this.basketSignal.set(b),
          error: err => this.ui.error(err.error?.message || 'Failed to remove item')
      });
  }
  
  increaseItem(itemId: string) {
       const id = this.basketSignal()?.id;
      if (!id) return;
      this.basketService.increaseItem(id, itemId).subscribe({
          next: b => {
             this.basketSignal.set(b);
             this.ui.success('The item has been added to your cart successfully.', 'Added to Cart');
          },
          error: err => this.ui.error(err.error?.message || 'Failed to increase quantity')
      });
  }
  
   decreaseItem(itemId: string) {
       const id = this.basketSignal()?.id;
      if (!id) return;
      this.basketService.decreaseItem(id, itemId).subscribe({
          next: b => this.basketSignal.set(b),
          error: err => this.ui.error(err.error?.message || 'Failed to decrease quantity')
      });
  }
  
  applyDiscount(code: string): import('rxjs').Observable<Basket | null> {
       const id = this.basketSignal()?.id;
       if (!id) return of(null);
       return this.basketService.applyDiscount(id, code).pipe(
           tap({
               next: b => this.basketSignal.set(b),
               error: err => this.ui.error(err.error?.message || 'Failed to apply discount')
           })
       );
  }
}
