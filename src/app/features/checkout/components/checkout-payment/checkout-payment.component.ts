import { Component, ElementRef, OnInit, ViewChild, inject, signal, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { CheckoutService } from '../../../../core/services/checkout/checkout.service';
import { UiFeedbackService } from '../../../../core/services/ui-feedback.service';
import { BasketStateService } from '../../../../core/services/cart/basket-state.service';
import { ConfigService } from '../../../../core/services/configurations/config.service';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-payment.component.html'
})
export class CheckoutPaymentComponent implements OnInit, OnDestroy {
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @Output() back = new EventEmitter<void>();

  checkoutService = inject(CheckoutService);
  basketState = inject(BasketStateService);
  ui = inject(UiFeedbackService);
  router = inject(Router);
  configService = inject(ConfigService);

  stripe: Stripe | null = null;
  elements: StripeElements | undefined;
  cardNumber: StripeCardElement | undefined;
  
  cardHandler = this.onChange.bind(this);
  cardErrors = signal<string | null>(null);
  loading = signal(false);
  isStripeReady = false;

  constructor() {}

  async ngOnInit() {
    await this.initializeStripe();
  }

  ngOnDestroy() {
    if (this.cardNumber) {
      this.cardNumber.destroy();
    }
  }

  onChange(event: any) {
    if (event.error) {
        this.cardErrors.set(event.error.message);
    } else {
        this.cardErrors.set(null);
    }
  }

  async initializeStripe() {
    const key = this.configService.publishableKey;
    if (!key) {
        this.ui.error('Stripe key is missing configuration');
        return;
    }
    
    this.stripe = await loadStripe(key);
    
    if (!this.stripe) {
        this.ui.error('Failed to load Stripe');
        return;
    }

    this.elements = this.stripe.elements();
    
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.cardNumber = this.elements.create('card', { style });
    
    if (this.cardNumberElement) {
         this.cardNumber.mount(this.cardNumberElement.nativeElement);
         this.cardNumber.on('change', this.cardHandler);
         this.isStripeReady = true;
    }
  }

  async submitOrder() {
    this.loading.set(true);
    const basket = this.basketState.basket();
    
    if (!basket) {
        this.ui.error('Your cart cannot be empty');
        this.loading.set(false);
        return;
    }

    try {
        const createdOrder = await new Promise<any>((resolve, reject) => {
             this.checkoutService.createOrder().subscribe({
                 next: resolve,
                 error: reject
             });
        });

        const clientSecret = this.checkoutService.clientSecret();
        if (!clientSecret || !this.stripe || !this.cardNumber) {
            throw new Error('Payment intent not initialized or Stripe not loaded');
        }

        const result = await this.stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: this.cardNumber,
                billing_details: {
                    name: this.checkoutService.shippingAddress()?.firstName + ' ' + this.checkoutService.shippingAddress()?.lastName
                }
            }
        });

        if (result.error) {
            this.ui.error(result.error.message || 'Payment failed');
            this.loading.set(false);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                this.router.navigate(['/checkout/success']);
            } else {
                this.ui.error('Payment verification failed');
                 this.loading.set(false);
            }
        }

    } catch (error: any) {
        console.error(error);
        this.ui.error(error.message || 'An error occurred during payment processing');
        this.loading.set(false);
    }
  }
}
