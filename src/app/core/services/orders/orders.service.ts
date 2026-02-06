
import { Injectable } from '@angular/core';
import { ResourceService } from '../resource.service';
import { DeliveryMethod, Order, OrderToCreate, PaymentIntentResponse } from '../../../shared/models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends ResourceService<Order> {

  constructor() {
    super('Orders');
  }

  getDeliveryMethods(): Observable<DeliveryMethod[]> {
    return this.http.get<DeliveryMethod[]>(this.buildUrl('delivery-methods'));
  }

  createOrder(order: OrderToCreate): Observable<Order> {
    return this.post<Order>('', order);
  }

  createPaymentIntent(basketId: string, deliveryMethodId: number): Observable<PaymentIntentResponse> {
    const url = `${this.baseUrl}/Payments?basketId=${basketId}&deliveryMethodId=${deliveryMethodId}`;
    return this.http.post<PaymentIntentResponse>(url, {});
  }
}
