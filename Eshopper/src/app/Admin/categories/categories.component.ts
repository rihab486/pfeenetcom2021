import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Category,Comment, ImageColor, Product, SCategory, Tag, User } from 'src/app/models/model';
import { CategoryService } from 'src/app/Services/category.service';
import { CommentsService } from 'src/app/Services/comments.service';
import { ProductService } from 'src/app/Services/product.service';
import { SCategoryService } from 'src/app/Services/scategory.service';
import { TagService } from 'src/app/Services/tag.service';
import { UserService } from 'src/app/Services/user.service';
import { AddImageColorComponent } from '../add-image-color/add-image-color.component';
import { AddscategoryComponent } from '../addscategory/addscategory.component';
import { AddtagtoproductComponent } from '../addtagtoproduct/addtagtoproduct.component';
import { CategoryComponent } from '../category/category.component';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  idCategory: any;
  idSCategory: any
  products: Product [] =[] ;
  scategory : SCategory = {} as SCategory;
  user: User = {} as User;
  panelOpenState!: boolean;
  tags!: Tag[];
  idProduct : any
  comments!: Comment[];
  constructor(private souscategorieservice : SCategoryService,private productService: ProductService, private categoryService: CategoryService,
    private route: ActivatedRoute, private dialog: MatDialog, private userService: UserService,
    private tagService: TagService, private commentService: CommentsService) {
    this.route.params.subscribe(
     params => {
      this.idSCategory = this.route.snapshot.params.idSCategory;
      this.souscategorieservice.findSCategoryById(this.idSCategory).subscribe(category => {
      this.scategory = category
         console.log( "sous categ par id", this.scategory)
          this.productService.findProductsForSCategory(this.idSCategory).subscribe((product : Product[]) => {
            this.products = product;
            console.log("products par scateg",this.products)
            
                 });
      })
      this.commentService.findAllComments().subscribe(comments => {
        this.comments = comments;
      })
    }
    )
  }

  ngOnInit(): void {
   
  }
  addTag(idProduct:any) {
    this.dialog.open(AddtagtoproductComponent, {data:{idProduct}})
   console.log(this.idProduct)
 
  }
 
  addImage(idProduct:number){
   this.dialog.open(AddImageColorComponent,{data :{idProduct}})
   console.log("id produ",this.idProduct)

  }
  showTags(idProduct:any) {
     this.tagService.findTagsForProduct(idProduct).subscribe(tags => {
      this.tags = tags;
    })
  }
 
  editSCategory(idSCategory:any) {
    this.dialog.open(AddscategoryComponent, {
      data: { idSCategory }
    })
  }
  deleteSCategory(idSCategory:any, idUser:any) {
    if (confirm("Are you sure")) {
      this.souscategorieservice.deleteSCategory(idSCategory).subscribe(() => {
        window.location.reload()
      })
    }
  }
  editProduct(idProduct :any) {
    this.dialog.open(ProductComponent, {
      data: { idProduct }
    })
  }
  deleteProduct(idProduct:any, idUser:any) {
    if (confirm("Are you sure")) {
      this.productService.deleteProduct(idProduct).subscribe(() => {
        window.location.reload()
        
       // window.location.replace(`/account/${idUser}`)
      })
    }
  }
  deleteComment(id:any) {
    if (confirm("Are you sure")) {
    this.commentService.deleteComment(id).subscribe(() => {
      window.location.reload();
    })
  }}
}
