import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {LoginComponent} from "./core/login/login.component";
import {DashboardComponent} from "./core/dashboard/dashboard.component";
import {ManageItemsComponent} from "./components/manage-items/manage-items.component";
import {ManageRentsComponent} from "./components/manage-rents/manage-rents.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path:'dashboard',component:DashboardComponent,children:[
      {path:'',component:HomePageComponent},
      {path: 'mitems', component: ManageItemsComponent},
      {path: 'mrents', component: ManageRentsComponent},
    ]},
  { path: 'shared', loadChildren: () => import('./core/shared/shared.module').then(m => m.SharedModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
