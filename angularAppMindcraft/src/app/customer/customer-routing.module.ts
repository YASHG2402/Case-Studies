import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerComponent } from "./customer.component";
import { CustomerDetailComponent } from "./customer.customerdetail";

const customerroutes : Routes = [
    {path : '', component : CustomerComponent},
    {path : 'customer', component  : CustomerComponent},
    {path : ':id', component : CustomerDetailComponent}
];
@NgModule({
    imports : [RouterModule.forChild(customerroutes)],
    exports : [RouterModule]
})
export class CustomerRoutingModel {

}