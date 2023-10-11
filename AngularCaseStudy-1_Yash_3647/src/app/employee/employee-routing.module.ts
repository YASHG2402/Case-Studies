import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { EmployeeComponent } from "./employee.component";





const employeeroutes:Routes=[
    {path:'',component:EmployeeComponent},
    {path:'employee',component:EmployeeComponent}
]
@NgModule({
imports:[RouterModule.forChild(employeeroutes)],
exports:[RouterModule]
}
)

export class EmployeeRoutingModule{}