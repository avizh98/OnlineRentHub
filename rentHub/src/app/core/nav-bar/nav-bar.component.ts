import { Component, OnInit } from '@angular/core';
import {} from '@fortawesome/free-solid-svg-icons';
import {first} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {CookieService} from "ngx-cookie";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  UserNamey = false
  showProfile = true;
  showSign=  false;
  cookieValue :any
  usersname:any
  UserNamex = true

  constructor(private cookieService: CookieService,private router: Router) { }

  ngOnInit(): void {
    this.cookieValue = JSON.parse(<string>this.cookieService.get('User'));
    if (this.cookieValue != null) {
      this.usersname = this.cookieValue
      this.UserNamex = false
      this.UserNamey = true
      this.showProfile = true;
      this.showSign = false;
    }else{
      this.UserNamex = true
      this.UserNamey = false
      this.showProfile = false;
      this.showSign = true;
    }
  }

  logout() {
    this.cookieService.removeAll();
    // this.router.navigate(['../homepage']);
    window.location.reload()
    this.router.navigate(['../homepage']);
    // this.router.events.pipe(
    //   first(evt => evt instanceof NavigationEnd)
    //
    // ).subscribe(() => {
    //   window.location.reload()
    //   this.locatione()
    //   console.log("this.locatione()")
    //  this.router.navigate(['../homepage']);
    // });
    // this.router.navigate(['../homepage']);
  }

  locatione(){
    //
    window.location.reload()
  }
}
