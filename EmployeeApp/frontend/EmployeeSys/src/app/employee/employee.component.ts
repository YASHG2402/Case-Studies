import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from './employee.model';
import { EmployeeService } from '../services/employee.services';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  employeeList: any[] = [];
  employeeObj: Employee = new Employee();
  currentEmpData: Employee = new Employee();

  employeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Z][a-zA-Z]*$/)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Z][a-zA-Z]*$/)]),
    contactNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^\d{10}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    id: new FormControl(),
  })

  get id() {
    return this.employeeForm.get('id');
  }
  get firstName() {
    return this.employeeForm.get('firstName');
  }

  get lastName() {
    return this.employeeForm.get('lastName');
  }

  get contactNo() {
    return this.employeeForm.get('contactNo');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get dob() {
    return this.employeeForm.get('dob');
  }

  get address() {
    return this.employeeForm.get('address');
  }

  constructor(private employeeService: EmployeeService, private cdr: ChangeDetectorRef  ) {

  }
  ngOnInit() {
    // Fetch data from the database when the component is initialized
    this.fetchEmployeeData();
  }
  select(selectedEmployee : Employee) {
    this.employeeObj = Object.assign({}, selectedEmployee);
    this.currentEmpData = Object.assign({}, selectedEmployee);
    this.cdr.detectChanges();
    console.log(this.employeeObj);
  }
  onSubmit() {
    const formData = this.employeeForm.value;
    // // Call the service method to insert data into the database
    // this.employeeService.insertEmployee(this.employeeForm.value).subscribe(
    //   (response) => {
    //     console.log('Data inserted successfully', response);
    //     window.alert('Data inserted successfully');
    //     this.employeeObj = response;
    //     // Clear the form after successful insertion
    //     this.employeeForm.reset();
    //     this.fetchEmployeeData();
    //   },
    //   (error) => {
    //     console.log('Error inserting data', error); 
    //     window.alert('Error inserting data');
    //   }
    // );
      // Insert data
      this.employeeService.insertEmployee(formData as Employee).subscribe(
        (response) => {
          console.log('Data inserted successfully', response);
          window.alert('Data inserted successfully');
          this.employeeForm.reset();
          this.fetchEmployeeData();
        },
        (error) => {
          console.error('Error inserting data', error);
          window.alert('Error inserting data');
        }
      );
  }
  fetchEmployeeData() {
    const currentEmpData = this.employeeObj.id;
    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        console.log(data);
        this.employeeList = data;
        // Filter the data to display only the current user's data
        this.currentEmpData = this.employeeList.find(emp => emp.id === this.currentEmpData.id);
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  updateEmployee() {
    const formData = this.employeeForm.value;
    // Ensure that the employeeObj.id is set and valid  
    if (this.employeeObj.id) {
      // Update data
      this.employeeService.updateEmployee(this.employeeObj.id, formData as Employee).subscribe(
        (response) => {
          console.log('Data updated successfully', response);
          window.alert('Data updated successfully');
          this.employeeObj = new Employee();
          this.fetchEmployeeData();
        },
        (error) => {
          console.error('Error updating data', error);
          window.alert('Error updating data');
        }
      );
    } else {
      // Handle the case where employeeObj.id is not set (invalid update operation)
      console.error('Invalid update operation: Employee ID is missing');
      window.alert('Invalid update operation: Employee ID is missing');
    }
  }
  deleteEmployeeById(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
        (response) => {
            console.log('Employee deleted successfully', response);
            window.alert('Employee deleted successfully');
            // Fetch the updated employee list after deletion
            this.fetchEmployeeData();
        },
        (error) => {
            console.error('Error deleting employee', error);
            window.alert('Error deleting employee');
        }
    );
}
}
