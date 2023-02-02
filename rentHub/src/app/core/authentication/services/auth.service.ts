import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO} from "../dto/UserDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  LoginUrl = environment.baseUrl;

  constructor(private http: HttpClient,) { }

  login(username: string, password : string): Observable<any> {
    return this.http.post(this.LoginUrl+'/user/userLogin',{
      username: username,
      password: password
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    });
  }


  signUp(userDTO: UserDTO) : Observable<any> {
    return this.http.post<any>(this.LoginUrl+'/user/create', {
      username: userDTO.username,
      email: userDTO.email,
      password: userDTO.password,
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    })
  }
}
