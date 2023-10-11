import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModel } from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridComponent } from '../component/grid.component';
import { CalculatorComponent } from '../calculator/calculator.component';
import { CustomerDetailComponent } from './customer.customerdetail';



@NgModule({
  declarations: [CustomerComponent, GridComponent, CalculatorComponent, CustomerDetailComponent],
  imports: [
    CommonModule, CustomerRoutingModel, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap:[CustomerComponent]
})
export class CustomerModule { }
