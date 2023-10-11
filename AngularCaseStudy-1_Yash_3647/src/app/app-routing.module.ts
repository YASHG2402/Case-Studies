import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path : '', loadChildren:()=>import('./login/login.module').then(p=>p.LoginModule)},
  {path : 'login', loadChildren:()=>import('./login/login.module').then(p=>p.LoginModule)},
  {path : 'employee', loadChildren:()=>import('./employee/employee.module').then(p=>p.EmployeeModule)},
  {path : 'welcome', loadChildren:()=>import('./welcome/welcome.module').then(p=>p.WelcomeModule), canActivate:[AuthGuard]},
  {path : '**', loadChildren:()=>import('./pagenotfound/pagenotfound.module').then(p=>p.PageNotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
