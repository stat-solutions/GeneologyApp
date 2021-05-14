import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthpageComponent } from './authpage.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ForgotLoginComponent } from './components/forgot-login/forgot-login.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {
    path: 'authpage',
    component: AuthpageComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegistrationComponent,
      },
      {
        path: 'changepassword/:userEmail',
        component: ChangepasswordComponent,
      },
      {
        path: 'forgotlogin',
        component: ForgotLoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
