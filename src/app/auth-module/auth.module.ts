import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { AuthpageComponent } from './authpage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ForgotLoginComponent } from './components/forgot-login/forgot-login.component';
import { AlertModule } from '@full-fledged/alerts';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ChangepasswordComponent,
    AuthpageComponent,
    ForgotLoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    BsDropdownModule,
    BrowserAnimationsModule,
    DatepickerModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 7000 }),
  ],
})
export class AuthModule {}
