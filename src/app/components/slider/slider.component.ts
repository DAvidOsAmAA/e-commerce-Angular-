import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    rtl:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    slideTransition:'linear',
    autoplayTimeout:1000,
    smartSpeed:1700,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
}
