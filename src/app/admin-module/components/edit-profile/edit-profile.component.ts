import { UsersService } from './../../../shared/services/users.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Registration } from 'src/app/shared/models/registration-interface';
// import { AlertService } from 'ngx-alerts';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
// import { AngularFireStorage } from '@angular/fire/storage';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  userData: Registration;
  registered = false;
  posted: boolean;
  errored: boolean;
  submitted = false;
  userForm: FormGroup;
  serviceErrors: any = {};
  value: string;
  fieldType: boolean;
  mySubscription: any;
  myDateValue: Date;
  positionValue: string;
  branch = ['branch 1', 'branch 2', 'branch 3'];
  bsModalRef: BsModalRef;
  fileInfo = { name: '', size: 0 };
  disableButton = true;
  userPhotoUrl: string;
  User = this.authService.loggedInUserInfo();
  constructor(
    private EditUser: UsersService,
    private authService: AuthServiceService,
    // private storage: AngularFireStorage,
    private fb: FormBuilder,
    // private alertService: AlertService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private bsModalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.myDateValue = new Date();
    this.userForm = this.createFormGroup();
    this.initializeForm();
    this.disableForm();
  }

  // here
  createFormGroup(): any {
    return this.fb.group(
      {
        full_name: new FormControl(''),
        email2: new FormControl('',
        Validators.compose([
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ])
        ),
        user_contact_number1: new FormControl(
          '',
          Validators.compose([
            CustomValidator.patternValidator(
              /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
              { hasNumber: true }
            ),
          ])
        ),
        user_contact_number2: new FormControl(
          '',
          Validators.compose([
            CustomValidator.patternValidator(
              /^(([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9]))$/,
              { hasNumber: true }
            ),
          ])
        ),
      },
    );
  }
  initializeForm(): any{
    this.EditUser.getUser(this.User.userId).subscribe( res => {
      const user = res[0];
      this.fval.full_name.setValue(user.userName);
      this.fval.email2.setValue(user.userEmail);
      this.fval.user_contact_number1.setValue(user.userPhone1);
      this.fval.user_contact_number2.setValue(user.userPhone2);
      this.userPhotoUrl = user.userPhotoUrl;
    });
  }
  revert(): any {
    this.userForm.reset();
  }

  get fval(): any {
    return this.userForm.controls;
  }
  disableForm(): any {
    return this.userForm.disable();
  }
  getBranch(event): any {}

  enableEdit(): any {
    return this.userForm.enable();
  }
  onFileSelected(event): any {
    let folder: string;
    switch (event.target.id) {
      case 'resetFile':
        folder = 'users/profiles';
        this.upload(event.target.id, event.target.files[0], folder);
        break;
    }
  }
  upload(inputType: string, getfile: any, path: any): any {
    const n = Date.now();
    const file = getfile;
    const filePath = `${path}/${n}`;
    // file ? console.log('true') : console.log('false');
    // const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(filePath, file);
    // const result = task
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       const downloadURL = fileRef.getDownloadURL();
    //       downloadURL.subscribe(url => {
    //         if (url) {
    //           switch (inputType) {
    //             case 'resetFile':
    //               this.userPhotoUrl = url;
    //               break;
    //           }
    //         }
    //       });
    //     })
    //   )
    //   .subscribe(url => {
    //     if (url) {
    //       // console.log(url);
    //     }
    //   });
  }
  // toggle visibility of password field
  toggleFieldType(): any {
    this.fieldType = !this.fieldType;
  }
  returnHome(): any {
    this.spinner.hide();
    this.revert();
  }
  cancel(): any {
    this.initializeForm();
    return this.userForm.disable();
  }

  update(template: TemplateRef<any>): any {
    this.bsModalRef = this.bsModalService.show(template);
  }
  closeModal(): any {
    this.bsModalRef.hide();
  }

  updateProfile(): any {
    setTimeout(() => {
      const data = {
        userId: this.User.userId,
        userPhotoUrl: this.userPhotoUrl
      };
      this.EditUser.putEditUserPhotoUrl(data).subscribe(
        (res) => {
          this.posted = true;
          // this.alertService.success({
          //     html: '<b> Profile photo edited successfully<b>',
          //   });
        },
        (err) => {
          this.errored = true;
          // this.alertService.danger({
          //     html: '<b> There was a problem<b>',
          // });
        }
      );
      this.closeModal();
    }, 3000);
  }
  save(): any {
    const data = {
      userId: this.User.userId,
      userName: this.fval.full_name.value.toUpperCase(),
      userPhone1: this.fval.user_contact_number1.value.toUpperCase(),
      userPhone2: this.fval.user_contact_number2.value.toUpperCase()
    };
    this.EditUser.putEditUser(data).subscribe(
      (res) => {
        this.posted = true;
        if (this.fval.email2.value !== '') {
            const dataEmal = {
              userId: this.User.userId,
              userEmail: this.fval.email2.value
            };
            this.EditUser.putEditUserEmail(dataEmal).subscribe(
              (rs) => {
                this.posted = true;
                // this.alertService.success({
                //     html: '<b> Email was edited successfully, please check your email to verify your account<b>',
                //   });
              },
              (err) => {
                this.errored = true;
                // this.alertService.danger({
                //     html: '<b> There was a problem editing user email<b>',
                // });
              }
            );
            setTimeout(() => {
              this.initializeForm();
              this.disableForm();
              // this.alertService.success({
              //   html: '<b> Other details were edited successfully<b>',
              // });
            }, 3000);
          }
      },
      (err) => {
        this.errored = true;
        this.initializeForm();
        this.disableForm();
        // this.alertService.danger({
        //     html: '<b> There was a problem editingg other details<b>',
        // });
      }
    );
  }
}
