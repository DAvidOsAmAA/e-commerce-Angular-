import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/service/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent  {
  allBrand:any = []
  constructor(private _BrandsService: BrandsService) {}

  getBrands() {
    this._BrandsService.getBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allBrand=res.data
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

ngOnInit():void{
  this.getBrands()
}
}
