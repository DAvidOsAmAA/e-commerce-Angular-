import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/service/products.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
product!:any;

  private readonly _ProductService = inject(ProductsService);
  private readonly _ActiveRputer = inject(ActivatedRoute);
  private readonly _ActivateRoute = inject(ActivatedRoute);




  ngOnInit(): void {
    let id: string | null = '';


    this._ActivateRoute.paramMap.subscribe({
      next: (params) => {
        id = params.get('id');
      },
    });


    this._ProductService.getProduct(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.product = res.data
      },
    });


    this._ActiveRputer.snapshot.params;
  }
}
