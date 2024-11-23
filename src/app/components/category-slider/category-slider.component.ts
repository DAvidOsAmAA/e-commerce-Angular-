import { Component, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/service/categories.service';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent {
  categories:any=[];
  private readonly _categoryService = inject(CategoriesService)
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    rtl:true,
    slideTransition:'linear',
    autoplayTimeout:1000,
    smartSpeed:1700,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items:4
      },
      740: {
        items: 4
      },
      940: {
        items: 8
      }
    },
    nav: true
  }
  getCategories(){
    this._categoryService.getCategories().subscribe({
      next:(res)=>{
        console.log(res)
        this.categories =res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  ngOnInit():void{
    this.getCategories()
  }
}
