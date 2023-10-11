import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { ProductComponent } from './product/product.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ContactComponent } from './contact/contact.component';
import { CrossfieldComponent } from './crossfield/crossfield.component';
import { DynamicformarrayComponent } from './dynamicformarray/dynamicformarray.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'home', component : HomeComponent},
  {path : 'login', component : LoginComponent},
  {path : 'contact', component : ContactComponent},
  {path : 'crossfield', component : CrossfieldComponent},
  {path : 'formarray', component : DynamicformarrayComponent},
  {path : 'customer', loadChildren: ()=> import('./customer/customer-module.module').then(p=>p.CustomerModule ), canActivate: [AuthGuard]},
  {path : 'product', loadChildren: ()=> import('./product/product.module').then(q=>q.ProductModule)},
  {path : '**', component : PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
