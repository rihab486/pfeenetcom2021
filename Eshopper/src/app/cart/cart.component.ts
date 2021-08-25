import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart, ProductOrder, ProductOrders } from '../models/model';
import { CartService } from '../Services/cart.service';
import { OrderService } from '../Services/order.service';
import { TokenStorageService } from '../Services/token-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentUser: any;
  carts!: Cart[];
  cartLength = 0;
  orders!: ProductOrders;
  total!: number;
  sub!: Subscription;
  constructor(private token: TokenStorageService, private route: Router,
    private cartService: CartService) {
    this.total = 0;
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.cartService.findCartsForUser(this.currentUser.id).subscribe(carts => {
      this.carts = carts;
      this.cartLength = this.carts.length;
      this.calculateTotal();
      //console.log("Total: ",this.total);
    });
  }

  calculateTotal() {
    let sum = 0;
    this.carts.forEach((value) => {
      sum += value.price * value.quantity;

    });
    this.total = sum;
  }

  check() {
    this.route.navigate(['/checkout'])
  }

  deleteCart(idPro: number, idUser: number) {
    if (confirm('Are you sur')) {
      this.cartService.removeFromCart(idPro, idUser).subscribe(() => {
        window.location.reload();
      })
    }
  }
}
