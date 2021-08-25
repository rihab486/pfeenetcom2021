import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageColor, Product } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ImagecolorServiceService {
  

  constructor(private http: HttpClient) { }
  
  addImageColorToProduct(pr: ImageColor, idProduct: any) :Observable<ImageColor> {
    return this.http.post<ImageColor>(`http://localhost:8080/api/addCommentToProduct/${idProduct}`,pr);
  }

}
