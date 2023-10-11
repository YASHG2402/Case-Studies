import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModel } from './product-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule, ProductRoutingModel, FormsModule
  ],
  providers:[],
  bootstrap:[ProductComponent]
})
export class ProductModule { }
