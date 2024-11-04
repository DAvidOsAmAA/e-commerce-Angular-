import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  private readonly  _Router = inject(Router);
  signUp(user: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      user
    );
  }
  signIn(user: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      user
    );
  }
  saveUserDate = () => {
    let token = localStorage.getItem('token');
    if (token) {
      try {
        let decode = jwtDecode(token);
        console.log(decode);
      } catch {
        this._Router.navigate(['signin'])
        localStorage.clear();
      }
    }
  };




  forgotPassword(email: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      email
    );
  }


  verifyResetCode(code: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      code
    );
  }



  resetPassword(newPass: any): Observable<any> {
    return this._HttpClient.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      newPass
    );
  }
}
