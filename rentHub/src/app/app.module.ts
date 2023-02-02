import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { SignUpComponent } from './core/authentication/sign-up/sign-up.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ItemsComponent } from './components/items/items.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { FooterComponent } from './core/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import * as Notiflix from "notiflix";
import { ItemDetailsComponent } from './components/items/components/item-details/item-details.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {CookieModule} from "ngx-cookie";
import { RentedItemsComponent } from './components/rented-items/rented-items.component';
import { RentedItemDetailsComponent } from './components/rented-items/components/rented-item-details/rented-item-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomePageComponent,
    AddItemComponent,
    ItemsComponent,
    NavBarComponent,
    FooterComponent,
    ItemDetailsComponent,
    RentedItemsComponent,
    RentedItemDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatSortModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    CookieModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
