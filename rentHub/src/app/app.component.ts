import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showHead: boolean = false;
  title = 'rentHub';

  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false



  }

  ngOnInit(): void {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showHead = false;

        } else if(event['url'] == '/signup') {
          // console.log("NU")
          this.showHead = false;

        }else{
          this.showHead = true;
        }
      }
    });
  }
}
