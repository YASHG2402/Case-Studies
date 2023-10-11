import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CustomerRestApiService } from "../services/customer.service";
import { Customer } from "./customer.model";

@Component({
    selector: 'app-customerdetail',
    templateUrl: './customer.customerdetail.component.html',
})

export class CustomerDetailComponent {
    id : number;
    customerObj : Customer = new Customer();

    constructor(private route: ActivatedRoute, private customerRestApiService : CustomerRestApiService) {
        this.route.params.subscribe(params => this.id = params['id']);
        this.getCustomerById(this.id);
    }
    getCustomerById(id) {    
        return this.customerRestApiService.getCustomerObject(id).subscribe((data: Customer) => {
          this.customerObj = data;
        });
      }
}