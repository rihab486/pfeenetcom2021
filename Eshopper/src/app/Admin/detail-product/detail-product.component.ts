import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment,Cart,Product, ProductOrder,  ProductOrders,  UpdateProduct, Tag, ERole } from 'src/app/models/model';
import { ProductService } from 'src/app/Services/product.service';

import { map } from 'rxjs/operators';
import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/Services/cart.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { Subscription } from 'rxjs';
import { CommentsService } from 'src/app/Services/comments.service';
import { LoginComponent } from '../login/login.component';
import { TagService } from 'src/app/Services/tag.service';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  cart: Cart = {} as Cart;
  productOrders: ProductOrder[] = [];
  productOrder: ProductOrder[] = [];

  products: Product[] = [];
  currentUser : any;
  submitted= false
  selectedProductOrder!: ProductOrder;
  productSelected: boolean = false;
  idProduct!: number;
  idTag : any ;
  product!: UpdateProduct;
  isLoggedIn: any;
  
  currentprod!:Product;
  name : any
  roles: string[] = [];
  tags: Tag[] = [];
  comment: Comment = {} as Comment;
  tag: Tag = {} as Tag;
  comments!: Comment[];
  stock !: boolean
  ROLE_ADMIN !: ERole;
  ROLE_CLIENT !: ERole;
  
  constructor(private router:Router,private tokenStorage:TokenStorageService,private route: ActivatedRoute,
    private productservice : ProductService,
     private commentservice : CommentsService,
    private tagservice: TagService,private cartService: CartService) { }

  ngOnInit(): void {  
   
    
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.loadProducts();
    this.currentUser = this.tokenStorage.getUser()
    this.sangleProduct();
    if(this.productOrders){}
  }
  loadProducts(){
    this.productservice.findAllProducts().subscribe(
      (products: any[]) => {
          this.products = products;
         
          for (let i =0 ; i <3; i++) {
            this.productOrder.push( new ProductOrder(products[i], 0))            
         }
      }
    );
  }
  private sangleProduct() {
    this.product = new UpdateProduct();
    this.idProduct = this.route.snapshot.params.idProduct;
    this.productservice.findProductById(this.idProduct).subscribe((products: any) => {
    this.products = products;
    this.productOrders.push(new ProductOrder(products,1));    
      });
    this.submitted = true;
    this.idProduct = this.route.snapshot.params.idProduct;
    this.commentservice.findCommentsForProduct(this.idProduct).subscribe((comments: Comment[]) => {
   this.comments = comments;
      }); 

  } 
  addToCart(order: ProductOrder, idUser: any){
    this.cart.addedby = this.currentUser.username;
      this.cart.name = order.product.name;
      this.cart.price= order.product.price;
      this.cart.datecmd=order.product.datecmd;
      this.cart.url=order.product.url;
      this.cart.quantity=order.quantity;
      this.cart.couleur=order.product.couleur;

      if( this.isLoggedIn == this.roles.includes('ROLE_CLIENT')){
        this.cartService.addCartToUser(this.cart,idUser ).subscribe(cart => {
          this.isLoggedIn = true;
          this.cart = cart;
          console.log(this.cart)
          window.location.reload()
         //   this.router.navigate(['/Cart', this.currentUser.id])
           
          
        })}
      
     
    }
   search(){}
 


addComment(idProduct  : any, username :any)
      {
    this.comment.addedBy= username
    if( this.isLoggedIn == this.roles.includes('ROLE_CLIENT')){
      this.currentUser= this.tokenStorage.getUser();
    this.commentservice.addCommentToProduct(this.comment, idProduct).subscribe(
      ( comment) => { 
        this.isLoggedIn = true;
        this.comment = this.comment;
           window.location.reload();
     })

      } 
     
    }
 
 login(){
  this.router.navigate(['/login'])

 }   

}
