import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent,NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _RouterNavigate = inject(Router);

  isBtnSubmit: boolean = false;
  errorMessage:string="";
  steps:any=1;
  forgetPassword = new FormGroup(
    {
      email: new FormControl(null,[Validators.required,Validators.email]),
    },
  );

  verifyResetCode = new FormGroup(
    {
      resetCode: new FormControl(null,[Validators.required]),
    },
  );

  resetPassword = new FormGroup(
    {
      email: new FormControl(null,[Validators.required,Validators.email]),
      newPassword: new FormControl(null,[Validators.required]),
    },
  );


  submitStep1() {
    this.isBtnSubmit = true;
    if (this.forgetPassword.valid) {
      this._AuthService.forgotPassword(this.forgetPassword.value).subscribe({
        next: (res) => {
  
  this.steps++;
            this.isBtnSubmit = false;
          
          console.log(res,this.steps);
        },
        error: (err:HttpErrorResponse) => {
          console.log(err.error.message)
          this.errorMessage=err.error.message
          this.isBtnSubmit = false;
        },
      });
    }
  }


  submitStep2() {
    this.isBtnSubmit = true;
    if (this.verifyResetCode.valid) {
      this._AuthService.verifyResetCode(this.verifyResetCode.value).subscribe({
        next: (res) => {
this.steps++

            this.isBtnSubmit = false;
          
          console.log(res);
        },
        error: (err:HttpErrorResponse) => {
          console.log(err.error.message)
          this.errorMessage=err.error.message
          this.isBtnSubmit = false;
        },
      });
    }
  }


  submitStep3() {
    this.isBtnSubmit = true;
    if (this.resetPassword.valid) {
      this._AuthService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          localStorage.setItem("token",res.token)
          this._AuthService.saveUserDate();
          this._RouterNavigate.navigate(['/home'])
          this.isBtnSubmit = false;
          
          console.log(res);
        },
        error: (err:HttpErrorResponse) => {
          console.log(err.error.message)
          this.errorMessage=err.error.message
          this.isBtnSubmit = false;
        },
      });
    }
  }


}
