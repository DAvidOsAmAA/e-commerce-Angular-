import { Validators } from "@angular/forms";

export const signUpValidator={
    name:[Validators.required,Validators.maxLength(20),Validators.minLength(2)],
    email:[Validators.required,Validators.email],
    password:[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)],
    

}