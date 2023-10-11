import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.services';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee/employee.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  users: Employee;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve user data from query parameters
    this.route.queryParams.subscribe((params) => {
      if (params['user']) {
        this.users = JSON.parse(params['user']);
      }
    });
  }
}
