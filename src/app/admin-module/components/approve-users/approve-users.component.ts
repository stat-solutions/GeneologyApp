import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { ExportService } from 'src/app/shared/services/export.service';
// import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.component.html',
  styleUrls: ['./approve-users.component.scss'],
})
export class ApproveUsersComponent implements OnInit {
  users: any;
  filteredUsers: any;
  fileName = 'users.xlsx';
  reverse = false;
  approvedUsers: any;
  posted: boolean;
  errored: boolean;
  roles: any;
  bsModalRef: BsModalRef;
  userName: string;
  userRole: FormGroup;
  userId: number;
  userIndex: number;
  makeUserApproved = [];
  disableButton = true;
  key: any = 'userId';
  @ViewChild('exportTable') element: ElementRef;
  // tslint:disable-next-line: variable-name
  search_user: string;
  User = this.authService.loggedInUserInfo();
  // tslint:disable-next-line: no-shadowed-variable
  constructor(
    private authService: AuthServiceService,
    private userService: UsersService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    // private alertService: AlertService,
    private exportService: ExportService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUserToApproval();
    this.getRoles();
    this.userRole = this.fb.group({
      role: ['', Validators.required],
    });
  }
  getUserToApproval(): any {
    this.userService.getUserForApproval().subscribe(
      (res) => {
        this.users = res;
        this.filteredUsers = this.users;
        // console.log(this.filteredUsers);
      },
      (err) => console.log(err.error.error.message)
    );
  }
  getRoles(): any {
    this.userService.getUserRoles().subscribe(
      (res) => {
        this.roles = res;
        // tslint:disable-next-line: only-arrow-functions
        this.roles = this.roles.map(function(role: any): any {
          return {
            roleId: role.roleId,
            roleName: role.roleName.replace(/_/g, ' ').toUpperCase(),
          };
        });
        // console.log(this.roles);
      },
      (err) => console.log(err.error.error.message)
    );
  }
  goToUsers(): any {
    this.router.navigate(['admin/users']);
  }
  openModal(template: TemplateRef<any>, imageUrl: string): any {
    // this.bsModalService.show(template);
  }
  // closemodal popup
  closeModal(): any {
    this.bsModalService.hide();
  }

  // getrole FormControl
  get fval(): any {
    return this.userRole.controls;
  }
  getValue(event): any {
    this.search_user = event.target.value;
    if (event.target.value === '') {
      this.filteredUsers = this.users;
      //  this.totalItems = this.users.length;
    } else {
      this.filteredUsers = this.filterUser(this.search_user);
      //  this.totalItems = this.users.length;
    }
  }

  filterUser(searchTerm: string): any {
    if (searchTerm) {
      // console.log(searchTerm);
      return this.filteredUsers.filter(
        (user) =>
          user.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1 ||
          user.userEmail.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    }
  }
  sort(item: string): any {
    this.key = item;
    this.reverse = !this.reverse;
  }
  assignRole(event): any {
    this.fval.role.setValue(event.target.value);
    this.disableButton = false;
  }

  exportToExcel(): any{
    this.exportService.exportExcel(this.filteredUsers, 'registeredusers');
  }

  approveUser(template: TemplateRef<any>, id: number, index: number): any {
    this.bsModalRef = this.bsModalService.show(template);
    this.makeUserApproved.push(this.users[index]);
    // console.log(this.makeUserApproved);
    this.userId = id;
    this.userIndex = index;
  }

  rejectUser(userInfo: any, id, index): any {
    // console.log(this.fval.role.value);
    this.disableButton = !this.disableButton;
    const data = {
      userId: userInfo[0].userId,
    };
    // console.log(data);
    this.userService.rejectUser(data).subscribe(
      (res) => {
        this.posted = true;
        // this.alertService.success({
        //     html: '<b> Approved successfully<b>',
        //   });
      },
      (err) => {
        this.errored = true;
        // this.alertService.danger({
        //     html: '<b> There was a problem<b>',
        // });
      }
    );
    this.fval.role.reset();
    this.closeModal();
  }

  approvedUser(userInfo: any, id, index): any {
    // console.log(this.fval.role.value);
    this.disableButton = !this.disableButton;
    const data = {
      userId: userInfo[0].userId,
      userStatus: 2,
      roleId: null,
      userIdApprover: this.User.userId,
    };
    this.roles.forEach((role) => {
      if (this.fval.role.value === role.roleName) {
        data.roleId = role.roleId;
      }
    });
    // console.log(data);
    this.userService.approveUser(data).subscribe(
      (res) => {
        this.posted = true;
        this.getUserToApproval();
        // this.alertService.success({
        //     html: '<b> Approved successfully<b>',
        //   });
      },
      (err) => {
        this.errored = true;
        this.getUserToApproval();
        // this.alertService.danger({
        //     html: '<b> There was a problem<b>',
        // });
      }
    );
    this.fval.role.reset();
    this.closeModal();
  }
}
