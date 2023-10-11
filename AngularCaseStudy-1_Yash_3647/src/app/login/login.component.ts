import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  token:any='yiuXjz187poii';
  loginForm = new FormGroup({
    UserName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    Password: new FormControl('',[Validators.required, Validators.minLength(3)]),
    
  })
  get UserName(){
    return this.loginForm.get('UserName');
  }
  get Password(){
    return this.loginForm.get('Password');
  }

  constructor(private httpClient : HttpClient, private route : Router) {

  }
  login() {
    this.httpClient.get<any>("http://localhost:3000/employees").subscribe(
      response => {
        const user = response.find((u:any) => {
          return u.Fname === this.loginForm.value.UserName && u.Dob === this.loginForm.value.Password;
        });
        if(user) {
          window.alert("Login Successfull");
          this.loginForm.reset();
          localStorage.setItem('token',this.token);
          this.route.navigate(['welcome']);
        } else {
          window.alert("User not found")
        }
      }
    ), error => {
      console.log("Something went wrong");
    }
  };
  
}
