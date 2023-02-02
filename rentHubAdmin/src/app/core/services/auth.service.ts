import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Url = environment.baseUrl;
  username:any
  constructor(private http: HttpClient,private cookieService: CookieService,private router: Router) { }

  logout() {
    this.cookieService.removeAll();
    this.router.navigate(['../login']);
  }

  login(username: string, password : string): Observable<any> {
    return this.http.post(this.Url+'/user/userLogin',{
      username: username,
      password: password
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    });
  }
}
