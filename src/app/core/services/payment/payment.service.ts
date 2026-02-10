import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PaymentIntentResponse } from '../../../shared/models/order';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  baseUrl = environment.baseURL;

  private _paymentIntentId = signal<string | null>(null);
  private _clientSecret = signal<string | null>(null);
  
  paymentIntentId = computed(() => this._paymentIntentId());
  clientSecret = computed(() => this._clientSecret());

  createPaymentIntent(basketId: string, deliveryMethodId: number): Observable<PaymentIntentResponse> {
    const url = `${this.baseUrl}Payments?basketId=${basketId}&deliveryMethodId=${deliveryMethodId}`;
    return this.http.post<PaymentIntentResponse>(url, {}).pipe(
      tap(response => {
        this._paymentIntentId.set(response.paymentIntentId);
        this._clientSecret.set(response.clientSecret);
      })
    );
  }
}
