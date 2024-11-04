import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

export const routes: Routes = [
    {path:"",component:AuthLayoutComponent,canActivate:[isLoggedInGuard],children:[
        {path:"",redirectTo:'signin',pathMatch:'full'},
        {path:"signup",component:SignupComponent,title:"signup"},
        {path:"signin",component:SigninComponent,title:"signin"},
        {path:"forgot-password",component:ForgetPasswordComponent,title:"forgot"}

    ]},
    {path:"",component:MainLayoutComponent,canActivate:[authGuard],children:[
        {path:"",redirectTo:'home',pathMatch:'full'},
        {path:"home",component:HomeComponent,title:"Home"},
        {path:"categories",component:CategoryComponent,title:"Categories"},
        {path:"brands",component:BrandsComponent,title:"Brands"},
        {path:"products",component:ProductsComponent,title:"Products"},
        {path:"cart",component:CartComponent,title:"Cart"},
        {path:"wishlist",component:WishlistComponent,title:"Wishlist"},
        {path:"order",component:OrdersComponent,title:"Order"},
    ]},

    {path:"**",component:NotfoundComponent},

];
