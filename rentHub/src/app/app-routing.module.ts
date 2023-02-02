import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AddItemComponent} from "./components/add-item/add-item.component";
import {ItemsComponent} from "./components/items/items.component";
import {LoginComponent} from "./core/authentication/login/login.component";
import {SignUpComponent} from "./core/authentication/sign-up/sign-up.component";
import {RentedItemsComponent} from "./components/rented-items/rented-items.component";

const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full' },
  {path: 'homepage', component: HomePageComponent},
  {path: 'additems', component: AddItemComponent},
  {path: 'allitems', component: ItemsComponent},
  {path: 'rentitems', component: RentedItemsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
