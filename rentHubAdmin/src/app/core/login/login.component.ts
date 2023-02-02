import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Notify} from "notiflix";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetailsForm!: FormGroup;

  constructor(private formBuilder:FormBuilder, private router: Router,private authService:AuthService,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.loginDetailsForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser():void{
    this.authService.login(this.loginDetailsForm.get('username')?.value,this.loginDetailsForm.get('password')?.value)
      .subscribe(res => {
        console.log(res)
        if (res.status == false){
          Notify.failure('Invalid Credentials');
        }else{
          this.cookieService.put('User', JSON.stringify(res.data));
          // this.cookieService.put('Arr', JSON.stringify(res.data));
          this.router.navigate(['../dashboard']);
        }
        // this.router.navigate(['/dashboard']);
        console.log(res)
        // Notify.failure('Invalid Credentials');
      })
  }

}
