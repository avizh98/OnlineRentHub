import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {UserDTO} from "../dto/UserDTO";
import {Router} from "@angular/router";
import {Notify} from "notiflix";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signDetailsForm!: FormGroup;

  constructor(private authService:AuthService,private formBuilder:FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.signDetailsForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signUser():void{
    this.authService.signUp(new UserDTO(
      this.signDetailsForm.get('username')?.value,
      this.signDetailsForm.get('email')?.value,
      this.signDetailsForm.get('password')?.value,
    )).subscribe((res: any) => {
      console.log(res)
      if (res.status == false){
        Notify.failure('Username or mail Already Exists');
      }else{
        Notify.success('User Successfully Added');
        this.router.navigate(['../login']);
      }
      }, (error: any) => {
      console.log(error);
      Notify.failure('Username or mail Already Exists');
    });
  }
}
