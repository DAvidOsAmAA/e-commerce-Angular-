import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslationService } from '../../core/service/my-translation.service';
import { CartService } from '../../core/service/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
private readonly _CartService=inject(CartService)

private readonly _MyTranslationService=inject(MyTranslationService);


counter:number = 0;



getLoggedUserCart=()=>{
  this._CartService.getLoggerUserCart().subscribe({
    next:(res)=>{
      this._CartService.cartCounter.next(res.numOfCartItems)
    },
    error:(err)=>{
      console.log(err)

    }
  })
}

ngOnInit(){
  this.getLoggedUserCart();
  this._CartService.cartCounter.subscribe({
    next:(counter)=>{this.counter=counter
    }
  })
  this._MyTranslationService.changeDirection()
}
selectLang(lang:string){
  this._MyTranslationService.changeLang(lang)
    }
}
