import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'employee', loadChildren: ()=> import('./employee/employee.module').then(p=>p.EmployeeModule), canActivate : [AuthGuard]},
  {path:'login', loadChildren: ()=> import('./login/login.module').then(p=>p.LoginModule)},
  {path:'welcome', component : WelcomeComponent},
  {path : '**', component : PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
