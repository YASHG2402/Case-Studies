import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,WelcomeRoutingModule,ReactiveFormsModule,MatTableModule,
    MatButtonModule,
  ]
})
export class WelcomeModule { }