import { Component, inject } from '@angular/core';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { signUpValidator } from '../../shared/validators/register.validator';
import { confirmPassword } from '../../shared/utils/confirm-password';
import { AuthService } from '../../core/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AlertErrorComponent,NgClass,ReactiveFormsModule,RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _RouterNavigate = inject(Router);

  isBtnSubmit: boolean = false;
  errorMessage:string="";
  login = new FormGroup(
    {
      email: new FormControl(null, signUpValidator.email),
      password: new FormControl(null, signUpValidator.password),
    },
  );

  sendData() {
    this.isBtnSubmit = true;
    if (this.login.valid) {
      this._AuthService.signIn(this.login.value).subscribe({
        next: (res) => {
          if(res.message=="success"){
            localStorage.setItem("token",res.token)
            this._AuthService.saveUserDate();
            this._RouterNavigate.navigate(['/home'])
            this.isBtnSubmit = false;
          }
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
