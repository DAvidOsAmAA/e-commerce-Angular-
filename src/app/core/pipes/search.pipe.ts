import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products:any[],searchTerm:string) {

    return products.filter((item)=>{
    return   item.title.includes(searchTerm)
    })
  }

}
