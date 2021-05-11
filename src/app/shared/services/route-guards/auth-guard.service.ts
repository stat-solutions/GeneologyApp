import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { AlertService } from 'ngx-alerts';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(
         private authService: AuthServiceService,
         private router: Router,
         private jwtHelper: JwtHelperService,
        //  private alert: AlertService,
         ) { }
    canActivate(): any {
      if (this.authService.isLoggedIn()) {
          console.log(this.jwtHelper.decodeToken(this.authService.getJwtToken()).roleId);
          switch (this.jwtHelper.decodeToken(this.authService.getJwtToken()).roleId){
               case 100:
                    this.router.navigate(['/application']);
                    break;
               case 200:
                    this.router.navigate(['/branchapproval']);
                    break;
               case 300:
                    this.router.navigate(['/branchexit']);
                    break;
               case 400:
                    this.router.navigate(['/regional']);
                    break;
               case 500:
                    this.router.navigate(['/headofficeentry']);
                    break;
               case 600:
                    this.router.navigate(['/legalreview']);
                    break;
               case 700:
                    this.router.navigate(['/creditanalysis']);
                    break;
               case 800:
                    this.router.navigate(['/headofficeapproval']);
                    break;
               case 900:
                    this.router.navigate(['/loanentry']);
                    break;
               case 1000:
                    this.router.navigate(['/loanverification']);
                    break;
               case 1100:
                    this.router.navigate(['/loanexit']);
                    break;
               case 1200:
                    this.router.navigate(['/disbursement']);
                    break;
               case 1300:
                    this.router.navigate(['/admin']);
             }
      }
      else {
        return !this.authService.isLoggedIn();
      }
    }
  }
