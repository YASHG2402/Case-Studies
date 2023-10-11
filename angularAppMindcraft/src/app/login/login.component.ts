import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    UserName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    Password: new FormControl('',[Validators.required, Validators.minLength(3)])
  })

  IsAuthenticationFailed : boolean;

  constructor(private route: Router, private httpClient : HttpClient) {
    this.IsAuthenticationFailed = false;
  }
  login() {
    //this.IsAuthenticationFailed = true;

    if(this.loginForm.controls.UserName.value=="admin" && this.loginForm.controls.Password.value=="123"){
      this.route.navigate(['customer'])
    }
    else {
      this.IsAuthenticationFailed = true;
    }
    this.httpClient.post("http://localhost:4000/signin", this.loginForm.value).subscribe((response : object) => {
      /*    if you check signin method in server.js code
            either will return token or will return error   */
        //console.log(Object.keys(response)  )              
        if (Object.keys(response)[0] != "token"){
               this.IsAuthenticationFailed=true
        }
        else {
              localStorage.setItem("token",JSON.stringify(Object.values(response)));
                let username = this.loginForm.controls.UserName.value;
                localStorage.setItem("UserName", JSON.stringify(username));
                this.route.navigate(['customer'])
        }
      })
    
    
  }

}
