import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.services';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private static token = 'gdidgbbib234Yash';

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

  constructor(private employeeService: EmployeeService, private route: Router, private http : HttpClient, private authService : AuthService) {

  }
  // login() {
  //   this.employeeService.getAllEmployees().subscribe(
  //     (users) => {
  //       const user = users.find(
  //         (u) => 
  //         u.Fname === this.loginForm.value.UserName &&
  //         u.Dob === this.loginForm.value.Password
  //       );
  //       if(user) {
  //         window.alert('Login Successful');
  //         this.loginForm.reset();
  //         localStorage.setItem('token', LoginComponent.token);
  //         this.route.navigate(['welcome'], { queryParams : { user : JSON.stringify(user)}});
  //       } else {
  //         window.alert('User Not Found')
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching users', error);
  //     }
  //   )
  // }
  login() {
    if (this.loginForm.valid) {
      const { UserName, Password } = this.loginForm.value;

      this.http.post<any>('http://localhost:3000/api/login', { UserName, Password}).subscribe(
        (response) => {
          if (response.message === 'Login successful') {
            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            this.authService.setAuthenticated(true);
            

            this.route.navigate(['/welcome'], { queryParams: { user: JSON.stringify(response.user) } });
          } else {
            console.error('Login failed:', response.message);
          }
        },
        (error) => {
          console.error('Error during login:', error);
        }
      );
    }
  }
}
