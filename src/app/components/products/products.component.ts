import { Component } from '@angular/core';
import { ProductsService } from '../../core/service/products.service';
import { AuthService } from '../../core/service/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  allproduct :any;
  constructor(private _ProductsService: ProductsService,private token:AuthService) {
    this.token.saveUserDate()
  }
  getProducts = () => {
    this._ProductsService.getProducts().subscribe({
      next:(res)=>{console.log(
        this.allproduct=res.data)},
      error:(error)=>{console.log(error)},
    })
  };
  
  ngOnInit(): void {
    this.getProducts()
  }
}
