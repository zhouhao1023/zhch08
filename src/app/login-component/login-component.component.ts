import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: FormControl;
  password: FormControl;
  baseUrl = 'http://127.0.0.1:8080/'

  constructor(private authService: AuthService, private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.myForm = this.fb.group(
      {
        'userName': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])]
      }
    );
    this.userName = <FormControl>this.myForm.controls['userName'];
    this.password = <FormControl>this.myForm.controls['password'];
  }

  ngOnInit(): void {
  }
  
  logout(){
    this.authService.logout();
  }

  //login(){
  //this.authService.Login();
  //}

  onSubmit(vlaue: any) {
    console.log(vlaue);
    this.httpClient.post(this.baseUrl + "login", vlaue).subscribe(
      (vl: any) => {
        if (vl.succ) {
          alert("登录成功")
          this.authService.Login();
          this.router.navigate(["/management"]);
        } else {
          alert("用户名或密码错误")
        }
      }
    )
  }
}