import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { confirmPassword } from '../../shared/utils/confirm-password';
import { signUpValidator } from '../../shared/validators/register.validator';
import { CommonModule, NgClass } from '@angular/common';
import { AuthService } from '../../core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, NgClass, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _RouterNavigate = inject(Router);

  isBtnSubmit: boolean = false;
  errorMessage:string="";
  register = new FormGroup(
    {
      name: new FormControl(null, signUpValidator.name),
      email: new FormControl(null, signUpValidator.email),
      password: new FormControl(null, signUpValidator.password),
      rePassword: new FormControl(null),
    },
    confirmPassword
  );

  sendData() {
    this.isBtnSubmit = true;
    if (this.register.valid) {
      this._AuthService.signUp(this.register.value).subscribe({
        next: (res) => {
          if(res.message=="success"){
            this._RouterNavigate.navigate(['/signin'])
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
