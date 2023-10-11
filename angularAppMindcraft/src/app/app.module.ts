import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ContactComponent } from './contact/contact.component';
import { CrossfieldComponent } from './crossfield/crossfield.component';
import { DynamicformarrayComponent } from './dynamicformarray/dynamicformarray.component';
import { BaseLogger, ConsoleLogger, DBLogger, FileLogger } from './services/logger';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent, HomeComponent, PagenotfoundComponent, ContactComponent, CrossfieldComponent, DynamicformarrayComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule
  ],
  providers: [
    {provide: BaseLogger, useClass: ConsoleLogger},
    {provide: "1", useClass : FileLogger},
    {provide: "2", useClass : DBLogger}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
