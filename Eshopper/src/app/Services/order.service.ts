import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductOrder, ProductOrders } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: ProductOrders = new ProductOrders();
  private productOrder!: ProductOrder;
  private total!: number;
  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();
  ProductOrderChanged = this.productOrderSubject.asObservable();
  OrdersChanged = this.ordersSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();

  constructor() { }

  set SelectedProductOrder(value: ProductOrder) {
    this.productOrder = value;
    this.productOrderSubject.next();
  }
  get SelectedProductOrder() {
    return this.productOrder;
  }
  set ProductOrders(value: ProductOrders) {
    this.orders = value;
    this.ordersSubject.next();
  }

  get ProductOrders() {
    return this.orders;
  }
  get Total() {
    return this.total;
  }
  set Total(value: number) {
    this.total = value;
    this.totalSubject.next();
  }
}
