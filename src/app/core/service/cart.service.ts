import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCounter:BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private _HttpClient :HttpClient) { }

 headers = {
  token:localStorage.getItem('token')!
};

  addProductToCart(productId:string):Observable<any>{

    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/cart",{productId})
  }
  updateProductQTY(productId:string,count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},)
  }

  deleteItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`)
  }


  clearCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,)
  }


  getLoggerUserCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
  }


}
