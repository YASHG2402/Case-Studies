import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from './employee.model';
import { EmployeeRestApiService } from '../services/employee.services';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  employeeObj: Employee = new Employee();

  employees : Array<Employee> = new Array<Employee>

  public employeeData: any[];

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

  constructor(private EmployeeService: EmployeeRestApiService) {
    this.loadEmployee();
   }

  select(selectedEmployee:Employee){
    this.employeeObj = Object.assign({},selectedEmployee);
    console.log(this.employeeObj);
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      // Create an Employee object with the form data
      const employeeData: Employee = {
        id: this.employeeForm.value.id,
        Fname: this.employeeForm.value.firstName,
        Lname: this.employeeForm.value.lastName,
        Contact: this.employeeForm.value.contactNo,
        Email: this.employeeForm.value.email,
        Dob: this.employeeForm.value.dob,
        Add: this.employeeForm.value.address, // You need to add 'address' to your form and Employee model
      };

      // Call the service method to save the data
      this.EmployeeService.createEmployee(employeeData).subscribe
      ((data: {}) => {
          window.alert("data inserted") // Log the response from the server
          // Optionally, you can reset the form after successful submission
          this.employeeForm.reset();
        },
        (error) => {
          console.error(error); // Handle any errors here
        }
      )
      this.EmployeeService.getEmployees().subscribe(data => {
        this.employeeData = data;
        console.log(this.employeeData)
      })
      this.loadEmployee();
    }
  }

  loadEmployee() {
    return this.EmployeeService.getEmployees().subscribe((data: 
      Employee []) => {
        //console.log(data)
        //this.customers = data;
        this.employees = new Array<Employee>();
        for(let item of data) {
          let emp : Employee = new Employee();
          emp.id = item.id;
          emp.Fname = item.Fname;
          emp.Lname = item.Lname;
          emp.Contact = item.Contact;
          emp.Email = item.Email;
          emp.Dob = item.Dob;
          emp.Add = item.Add;
          this.employees.push(emp);
        }
      });
  }

  // postToServer() {
    

    
  // }

   updateToServer() {
     var employeedto:any = {};
     employeedto.id = this.employeeObj.id;
     employeedto.Fname = this.employeeObj.Fname;
     employeedto.Lname = this.employeeObj.Lname;
     employeedto.Contact = this.employeeObj.Contact;
     employeedto.Email = this.employeeObj.Email;
     employeedto.Dob = this.employeeObj.Dob;
     employeedto.Add = this.employeeObj.Add

     this.EmployeeService.updateEmployee(employeedto.id, employeedto).subscribe(
        (data: {}) => {
          console.log("Update Response:", data);
          window.alert("data updated");
          this.loadEmployee(); 
     }), (error) => {
      console.error("Update Error:", error);
     };
   }

    deleteFromServer() {
      if(this.employeeObj.id) {
        let id = this.employeeObj.id;
        this.EmployeeService.deleteEmployee(id).subscribe(
        (data: {}) => {
          console.log("Delete Response:", data);
          window.alert("data deleted");
          this.loadEmployee();
     }, (error) => {
      console.error("Delete Error:",error);
     }
    );    
    } else {
      console.error("Delete error: id is undefined");
    }
  }
}
