import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/service/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  allproduct :any;
  constructor(private _ProductsService: ProductsService) {
    
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
