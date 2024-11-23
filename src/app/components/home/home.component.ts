import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ProductsService } from '../../core/service/products.service';
import { AuthService } from '../../core/service/auth.service';
import { SliderComponent } from "../slider/slider.component";
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/service/cart.service';
import Swal from 'sweetalert2'
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CategorySliderComponent,RouterLink,SearchPipe,FormsModule,NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  term:string=""
  private readonly _CartService = inject(CartService)
  allproduct :any;
  cancelSubScribtion:Subscription=new Subscription;
  constructor(private _ProductsService: ProductsService,private token:AuthService) {
    this.token.saveUserDate()
  }
  getProducts = () => {

 this.cancelSubScribtion=  this._ProductsService.getProducts().subscribe({


      next:(res)=>{
        this.allproduct=res.data
      },
      error:(error)=>{console.log(error)},
    })
  };

  addToCart=(productId:string)=>{
this._CartService.addProductToCart(productId).subscribe({
  next:(res)=>{
    this._CartService.cartCounter.next(res.numOfCartItems) 
    Swal.fire({
      title: "",
      text: "Added Successfully to Cart",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        confirmButton: 'my-3 w-100 bg-main text-white' 
      }
    });
    console.log(res)
  },
  error:(err)=>{
    Swal.fire({
    title: "<strong>Oops <u>!</u></strong>",
      icon: "info",
      html: `
        Doesn't <b>added to the cart</b>,
        
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
ngOnDestroy(){
  this.cancelSubScribtion.unsubscribe()
}

  ngOnInit(): void {
    this.getProducts()
  }
}
