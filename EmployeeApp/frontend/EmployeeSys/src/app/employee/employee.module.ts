import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,EmployeeRoutingModule,ReactiveFormsModule,
    FormsModule,
  ],providers:[],
  bootstrap:[EmployeeComponent]
})
export class EmployeeModule { }