import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
// import { AlertService } from 'ngx-alerts';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { Observable } from 'rxjs';
import {UsersService} from 'src/app/shared/services/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registered: boolean;
  submitted: boolean;
  errored: boolean;
  userForm: FormGroup;
  loginStatus: any;
  fieldType: boolean;
  value: string;
  passwordFailed = true;
  stationBalanceExits: boolean;
  mySubscription: any;
  serviceErrors: any = {};
  constructor(
    private authService: AuthServiceService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    // private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private layoutService: LayoutService,
  ) {}

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    if (this.authService.getPleaseLogin()) {
      // this.alertService.warning({
      //   html: '<b>System logged you out due to 12 mins of inactivity</b>'
      // });
    }
  }

  createFormGroup(): any {
    return new FormGroup({

      userEmail: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ])
      ),
      userPassword: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/, { hasNumber: true })
        ])
      )
    });
  }

  get fval(): any {
    return this.userForm.controls;
  }

  revert(): any {
    this.userForm.reset();
  }

// toggle visibility of password field
    toggleFieldType(): any {
      this.fieldType = !this.fieldType;
    }

    login(): any {
    this.submitted = true;
    if (this.userForm.invalid === true) {
      return;
    } else {
      this.spinner.show();
      this.authService.loginNormalUser(
        {
          userEmail: this.fval.userEmail.value,
          userPassword: this.fval.userPassword.value
        }
      ).subscribe((success: boolean) => {
        if (success) {
          // this.posted = true;
          if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).userStatus === 2) {
            // console.log(this.jwtHelper.decodeToken(this.authService.getJwtToken()).roleId);
            switch (this.jwtHelper.decodeToken(this.authService.getJwtToken()).roleId){
              case 99:
                // this.alertService.danger({
                //   html:
                //     '<strong>This account is not assigned a role, please contact system admin!</strong>'
                // });
                this.spinner.hide();
                break;
              case 100:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/application']);
                }, 1000);
                break;
              case 200:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/branchapproval']);
                }, 1000);
                break;
              case 300:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/branchexit']);
                }, 1000);
                break;
              case 400:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/regional']);
                }, 1000);
                break;
              case 500:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/headofficeentry']);
                }, 1000);
                break;
              case 600:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/legalreview']);
                }, 1000);
                break;
              case 700:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/creditanalysis']);
                }, 1000);
                break;
              case 800:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/headofficeapproval']);
                }, 1000);
                break;
              case 900:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/loanentry']);
                }, 1000);
                break;
              case 1000:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/loanverification']);
                }, 1000);
                break;
              case 1100:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/loanexit']);
                }, 1000);
                break;
              case 1200:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/disbursement']);
                }, 1000);
                break;
              case 1300:
                // this.alertService.success({
                //   html: '<strong>Signed In Successfully</strong>'
                // });
                this.spinner.hide();
                setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/admin']);
                }, 1000);
            }
          }
          else if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).userStatus === 3) {
            // this.alertService.danger({
            //   html:
            //     '<strong>This account has been deactivated!, please contact system admin!</strong>'
            // });
            this.spinner.hide();
            return;
          }
          else if (this.jwtHelper.decodeToken(this.authService.getJwtToken()).userStatus === 1) {
            // this.alertService.danger({
            //   html:
            //     '<strong>This account recquires approval, please contact system admin!</strong>'
            // });
            this.spinner.hide();
            return;
          }
        } else {
          this.spinner.hide();
          this.errored = true;
        }
      },

      (error: any) => {
        this.spinner.hide();
        this.errored = true;
        this.loginStatus = error;
        if (this.loginStatus.status === 412) {
          // this.alertService.danger({
          //   html: '<b>' + this.fval.userEmail.value + ' recquires verification first' + '<br/>'
          // });
          this.passwordFailed = true;
          this.spinner.hide();
        } else {
          // this.alertService.danger({
          //   html: '<b>' + this.loginStatus.error.error.message + '<br/>'
          // });
        }
        this.spinner.hide();

      });
    }
  }
}


