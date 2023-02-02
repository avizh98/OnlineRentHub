import {Component, Input, OnInit} from '@angular/core';
import {NavData} from "../../../../../assets/Nav";
import {NavDTO} from "./dto/NavDTO";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-left-side-nav-bar',
  templateUrl: './left-side-nav-bar.component.html',
  styleUrls: ['./left-side-nav-bar.component.scss']
})
export class LeftSideNavBarComponent implements OnInit {

  @Input() navState = true;
  donMenus: NavDTO [] = NavData;

  donmenu= true;
  volmenu= false;

  constructor( private cookieService: CookieService) {

  }

  ngOnInit(): void {

  }
}
