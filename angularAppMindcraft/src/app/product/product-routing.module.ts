import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductComponent } from "./product.component";

const productroutes : Routes = [
    {path : '', component : ProductComponent},
    {path : 'product', component  : ProductComponent}
];
@NgModule({
    imports : [RouterModule.forChild(productroutes)],
    exports : [RouterModule]
})
export class ProductRoutingModel {

}