import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../core/service/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adreess',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './adreess.component.html',
  styleUrl: './adreess.component.scss',
})
export class AdreessComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _OrderService = inject(OrderService);
  private readonly route = inject(ActivatedRoute);
  cardId: string = '';
  address: FormGroup = this._FormBuilder.group({
    details: [null],
    phone: [null],
    city: [null],
  });

  payment = () => {
    this._OrderService.createSession(this.cardId,this.address.value).subscribe({
      next:(res)=>{
        console.log(res)
        window.location.href=res.session.url;
      },
      error:(err)=>{
        console.log(err)
      }
    });
  };



  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.cardId = params.get('id')!;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
