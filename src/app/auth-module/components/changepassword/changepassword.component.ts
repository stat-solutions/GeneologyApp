import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
// import { AlertService } from 'ngx-alerts';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-change-password',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  registered: boolean;
  submitted: boolean;
  errored: boolean;
  posted: boolean;
  whiteListedContact: boolean;
  userForm: FormGroup;
  loginStatus: string;
  fieldType: boolean;
  value: string;
  stationBalanceExits: boolean;
  mySubscription: any;
  serviceErrors: any = {};
  userEmail: string;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
    // private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private layoutService: LayoutService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.userEmail = params['userEmail']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
    console.log(this.userEmail);
  }

  sendResetPasswordLink(): any {
    this.authService.passwordChangeCode({userEmail: this.userEmail}).subscribe(
      res => {
        this.posted = true;
        // this.alertService.success({
        //   html: '<strong>A password change code has been sent to your email,</strong>' +
        //         '<br>' + '<strong> use it to change password within 15 minutes</strong>'
        // });
      },
      err => {
        console.log(err.error.error.message);
      }
    );
  }

  createFormGroup(): any {
    return this.fb.group({
      code: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required
          CustomValidator.patternValidator(
            /^(([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
            {
              hasNumber: true,
            }
          ),
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required

          Validators.required,

          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/, {
            hasNumber: true
          }),
        ])
      ),
      confirmPassword: new FormControl(
        '',
        Validators.compose([
          // 1. Password Field is Required

          Validators.required,

          // 2. check whether the entered password has a number
          CustomValidator.patternValidator(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
            {
              hasNumber: true,
            }
          ),
        ])
      )
    }, {validator: CustomValidator.passwordMatchValidator}
    );
  }


  revert(): any {
    this.userForm.reset();
  }
// method for canceling action
  returnHome(): any {
    this.spinner.hide();
    this.revert();

    setTimeout(() => {
      this.router.navigate(['authpage/login']);
    }, 2000);
  }

  get fval(): any {
    return this.userForm.controls;
  }

// toggle visibility of password field
    toggleFieldType(): any {
      this.fieldType = !this.fieldType;
    }



    changePassword(): any {
    this.submitted = true;

    this.spinner.show();

    if (this.userForm.invalid === true) {
      return;
    } else {
      this.authService
        .changePIN(
          {
            userEmail: this.userEmail,
            theChangeCode: this.fval.code.value,
            userPassword: this.fval.password.value
          }
        )
        .subscribe(
          (success: boolean) => {
            if (success) {
              this.spinner.hide();
              this.posted = true;
              // this.alertService.success({
              //   html: '<strong>Password changed successfully, you can now log In</strong>'
              // });
              setTimeout(() => {
                  this.spinner.hide();
                  this.router.navigate(['/authpage']);
                }, 1000);
            }
          },
          (error: string) => {
            this.spinner.hide();
            this.errored = true;
            this.loginStatus = error;
            // this.alertService.danger(this.loginStatus);
            // this.alertService.danger({
            //   html: '<b>' + this.loginStatus + '</b>' + '<br/>'
            // });
            // this.alertService.warning({html: '<b>Signed In Successfully</b>'});
            if (
              this.loginStatus === 'Action Failed!!'
            ) {
              setTimeout(() => {
                this.router.navigate(['authpage/login']);
              }, 1000);
            }
            this.spinner.hide();

          }
        );
    }
  }



}


