import { Component } from '@angular/core';
import { CategoriesService } from '../../core/service/categories.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  allCategories: any = [];
  constructor(private _CategoriesService: CategoriesService) {}

  getCategories() {
    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allCategories = res.data
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.getCategories();
  }
}
