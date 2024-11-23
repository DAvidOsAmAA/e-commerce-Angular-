import { Component, inject } from '@angular/core';
import { CartService } from '../../core/service/cart.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
private readonly _CartService = inject(CartService);
cart:any;

getLoggedUserCart=()=>{
  this._CartService.getLoggerUserCart().subscribe({
    next:(res)=>{
      this.cart = res;
    },
    error:(err)=>{
      console.log(err)

    }
  })
}

deleteItem=(productId:string)=>{
this._CartService.deleteItem(productId).subscribe({
  next:(res)=>{
    console.log(res)
    this._CartService.cartCounter.next(res.numOfCartItems) 
    this.cart=res
    Swal.fire({
      title: "",
      text: "Deleted Successfully from the Cart",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        confirmButton: 'my-3 w-100 bg-main text-white' 
      }
    });
  },
  error:(err)=>{
    console.log(err)
    Swal.fire({
      title: "<strong>Oops <u>!</u></strong>",
        icon: "info",
        html: `
          Doesn't <b>removed from the cart</b>,
          
        `,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Ok!
      `, 
      customClass: {
        confirmButton: "bg-danger",
      }
      });
  }
})
}

updateQuantity=(productId:string, count:number)=>{
  this._CartService.updateProductQTY(productId,count).subscribe({
    next:(res)=>{
      console.log(res)
      this.cart=res
      Swal.fire({
        title: "",
        text: "Quntity changed Successfully",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: 'my-3 w-100 bg-main text-white' 
        }
      });
    },
    error:(err)=>{
      console.log(err)
      Swal.fire({
        title: "<strong>Oops <u>!</u></strong>",
          icon: "info",
          html: `
            Doesn't <b>added</b>,
            
          `,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: `
          <i class="fa fa-thumbs-up"></i> Ok!
        `, 
        customClass: {
          confirmButton: "bg-danger",
        }
        });
    }
  })
  }
ngOnInit():void{
this.getLoggedUserCart()
}
}
