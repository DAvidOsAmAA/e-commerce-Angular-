import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _HttpClient: HttpClient) {}

  createSession(cartId: string,shippingAddress:object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/orders/checkout-session/' +
        cartId+"?url=http://localhost:4200",
      {
        shippingAddress
      },{
        headers:{
          token:localStorage.getItem("token")!
        }
      }
    );
  }
}
