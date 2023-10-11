import { Component } from '@angular/core';
import { Customer } from './customer.model';
import { CustomerRestApiService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  customerObj : Customer = new Customer();

  customers : Array<Customer> = new Array<Customer>

  loginUserFirstName : string = "Dummy";
  constructor(private customerRestApiService : CustomerRestApiService, private route: Router) {
    this.loadCustomer();

    this.loginUserFirstName = JSON.parse(localStorage.getItem("UserName") || "");


    // this.customerObj.Id = "101";
    // this.customerObj.CustomerName = "Yash";
    // this.customerObj.Amount = 10000;3

    // let customer1 : Customer = new Customer();
    // customer1.Id = "102";
    // customer1.CustomerName = "Sameer";
    // customer1.Amount = 20000;

    // let customer2 : Customer = new Customer();
    // customer2.Id = "103";
    // customer2.CustomerName = "Pranav";
    // customer2.Amount = 30000;

    // this.customers.push(customer1);
    // this.customers.push(customer2);
  }

  demo() {
    window.alert("button clicked");
  }
  clear() {
    this.customerObj = new Customer();
  }
  add() {
    this.customers.push(this.customerObj);
    this.clear();
  }
  select(selectedCustomer : Customer){
    //this.customerObj = selectedCustomer; // object referencing
    this.customerObj = Object.assign({}, selectedCustomer); // cloning
  }
  update() {
    const findIndex = this.customers.findIndex(c => c.id == this.customerObj.id);
    if(findIndex >= 0){
      this.customers[findIndex].CustomerName = this.customerObj.CustomerName;
      this.customers[findIndex].Amount = this.customerObj.Amount;
    }
    window.alert("Updated successfully");
  }
  delete() {
    const findIndex = this.customers.findIndex(c=>c.id == this.customerObj.id)
    if(findIndex >= 0)
    {
      this.customers.splice(findIndex,1);
    }else {
      window.alert("Record not Found" + findIndex)
    }
    this.customerObj = new Customer();
  }

  hasError(typeofvalidator:string, controlname:string) : Boolean {
    return this.customerObj.formCustomerGroup.controls[controlname].hasError(typeofvalidator);
  }

  loadCustomer() {
    return this.customerRestApiService.getCustomers().subscribe((data: 
      Customer[]) => {
        //console.log(data)
        //this.customers = data;
        this.customers = new Array<Customer>();
        for(let item of data) {
          let cust : Customer = new Customer();
          cust.id = item.id;
          cust.CustomerName = item.CustomerName;
          cust.Amount = item.Amount;
          this.customers.push(cust);
        }
      });
  }
  postToServer() {
    var customerdto:any = {};
    customerdto.id = this.customerObj.id;
    customerdto.CustomerName = this.customerObj.CustomerName;
    customerdto.Amount = this.customerObj.Amount;

    this.customerRestApiService.createCustomer(customerdto).subscribe
    ((data: {}) => {
      window.alert("data inserted")
    });
    this.loadCustomer();
  }

  updateToServer() {
    var customerdto:any = {};
    customerdto.id = this.customerObj.id;
    customerdto.CustomerName = this.customerObj.CustomerName;
    customerdto.Amount = this.customerObj.Amount;

    this.customerRestApiService.updateCustomer(customerdto.id, customerdto).subscribe
    ((data: {}) => {
      window.alert("data updated")
    });
    this.loadCustomer();
  }

  deleteFromServer() {
    let id = this.customerObj.id;
    this.customerRestApiService.deleteCustomer(id).subscribe
    ((data: {}) => {
      window.alert("data deleted")
    });
    this.loadCustomer();
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    this.route.navigate(['login']);
  }
}
