
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
    console.log(order);
    return this.post<Order>('', order);
  }

  getOrders(): Observable<Order[]> {
    return this.get<Order[]>();
  }

  getOrder(id: string): Observable<Order> {
    return this.getById<Order>(id);
  }
}
