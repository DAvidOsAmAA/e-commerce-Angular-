import { Component, HostListener } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  goToTop() {
    scrollTo(0, 0);
  }

  showBtn = false;

  @HostListener('window:scroll')
  scrollToTo() {
    let scrollToTop = document.documentElement.scrollTop;

    console.log('scrolled');
    if (scrollToTop > 500) {

      this.showBtn = true;

    } else {

      this.showBtn = false;
      
    }
  }
}
