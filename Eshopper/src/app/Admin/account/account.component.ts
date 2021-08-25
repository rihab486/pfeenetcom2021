import { Component, Inject, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryComponent } from '../category/category.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { AddtagComponent } from '../addtag/addtag.component';
import { AddscategoryComponent } from '../addscategory/addscategory.component';
import { SCategoryService } from 'src/app/Services/scategory.service';
import { AuthUserService } from 'src/app/Services/auth-user.service';
import { Cart, Category, Product, SCategory, User } from 'src/app/models/model';
import { CartService } from 'src/app/Services/cart.service';
import { ProductComponent } from '../product/product.component';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  currentUser: any;
  categories: Category[] = [] ;
  cartLength = 0;
  private roles: string[] = [];
  idCategory: any
  isLoggedIn : any 
  currentIndex = -1;
  name = ''; 
  users !: User[];
  carts!: Cart[];
  id:any
  //souscategorie: any = [[]];
 constructor(private cartService: CartService,private userservice : AuthUserService,private scategorieservice: SCategoryService,private token: TokenStorageService, private userService: UserService, private route: ActivatedRoute, private dialog: MatDialog,
    private categoryService: CategoryService, private router: Router) 
    {
      this.route.params.subscribe(
        params => {
          this.userservice.findAllUsers().subscribe(user=> {
           this.users = user;
            console.log(this.users)
      });
        
          this.categoryService.findAllCategories().subscribe(categories => {
          this.categories = categories;
        console.log(categories)


          /* for( let i = 0 ; i<this.categories.length ; i++){
            this.souscategorie.push(this.categories[i].souscategories) 
           }*/
         
          }) ;
    })
    }
  ngOnInit(): void{

     this.currentUser = this.token.getUser();


  }
  
  deleteRecl(idReclamation:any, idUser:any){
    if (confirm('Are you sure')) {
      this.userservice.removeFromAccount( idUser).subscribe(() => {
        window.location.reload();
      })
    }

  }
  logout(): void {
    this.token.signOut();
    this.router.navigate(['/dashboarda'])
  }
  addCategory(idUser: any) {
    this.dialog.open(CategoryComponent, {
      data: { idUser }
    })
  }
  deleteuser( idUser:any){
    if (confirm('Are you sure')) {
      this.userservice.removeFromAccount( idUser).subscribe(() => {
        window.location.reload();
      })
    }

  }

  addTag(){
    this.dialog.open(AddtagComponent);
  }
  addProduct(idSCategory:number) {

 this.dialog.open(ProductComponent,{data : {idSCategory}})
 
  }
  addImage(){
    
  }
   addSCategory(idCategory : any){
     this.dialog.open(AddscategoryComponent, {data : {idCategory}})

   }
 

   
  }
  
  



 

 


