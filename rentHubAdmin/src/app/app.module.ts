import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { TopBarComponent } from './core/dashboard/components/top-bar/top-bar.component';
import { LeftSideNavBarComponent } from './core/dashboard/components/left-side-nav-bar/left-side-nav-bar.component';
import { MenuContainerComponent } from './core/dashboard/components/left-side-nav-bar/components/menu-container/menu-container.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ManageItemsComponent } from './components/manage-items/manage-items.component';
import { ManageRentsComponent } from './components/manage-rents/manage-rents.component';
import { UpdateItemsComponent } from './components/manage-items/components/update-items/update-items.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "./core/shared/shared.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {UpdateRentsComponent} from "./components/manage-rents/components/update-rents/update-rents.component";
import {HttpClientModule} from "@angular/common/http";
import {CookieModule} from "ngx-cookie";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TopBarComponent,
    LeftSideNavBarComponent,
    MenuContainerComponent,
    HomePageComponent,
    ManageItemsComponent,
    ManageRentsComponent,
    UpdateItemsComponent,
    UpdateRentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTableModule,
    SharedModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    CookieModule.forRoot(),
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
