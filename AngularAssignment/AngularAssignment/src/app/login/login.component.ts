import { Component } from '@angular/core';
import { User } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userObj : User = new User();

  constructor() {
    this.userObj.Username = "yash";
    this.userObj.Password = "admin1";

    let user1 : User = new User();
    user1.Username = "yash";
    user1.Password = "admin1";
  }
  valid() {
    if(c =>c.Username == this.userObj.Username)
    {{}}
  }
}
