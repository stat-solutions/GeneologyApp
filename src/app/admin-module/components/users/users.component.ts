import { Component, OnInit, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import {UsersService} from '../../../shared/services/users.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ExportService } from 'src/app/shared/services/export.service';
// import { AlertService } from 'ngx-alerts';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  modalRef: BsModalRef;
  userForm: FormGroup;
  posted = false;
  errored = false;
  user: any;
  filteredUsers = [];
  searchTerm: string;
  fileName = 'users.xlsx';
  totalItems: number;
  id: string;
  reverse = false;
  currentPage = 1;
  pageSize = 9;
  age: number;
  key: any = 'userId';
  roles: any;
  imageUrl: string;
  branches: any;
  User = this.authService.loggedInUserInfo();
  @ViewChild('exportTable') element: ElementRef;

  constructor(
    private userService: UsersService,
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private modalService: BsModalService,
    private exportService: ExportService,
    // private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
    this.userForm = this.createFormGroup();
  }
  createFormGroup(): any {
    return new FormGroup({
      userName: this.fb.control('', Validators.compose([Validators.required])),
      role: this.fb.control('', Validators.compose([Validators.required])),
    });
  }
  getUsers(): any {
    this.userService.getUsers().subscribe((res) => {
      this.user = res;
      this.filteredUsers = this.user;
      this.totalItems = this.user.length;
    });
  }
  getRoles(): any {
    this.userService.getUserRoles().subscribe(
      (res) => {
        this.roles = res;
        // tslint:disable-next-line: only-arrow-functions
        this.roles = this.roles.map(function (role: any): any {
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
  getValue(event): any {
    // console.log(event.target.value);
    this.searchTerm = event.target.value;
    if (event.target.value === '') {
      this.filteredUsers = this.user;
      this.totalItems = this.filteredUsers.length;
    } else {
      this.filteredUsers = this.filterCustomer(this.searchTerm);
      this.totalItems = this.filteredUsers.length;
    }
  }
  // modal method
  public openModal(template: TemplateRef<any>, imageUrl: string): any {
    this.imageUrl = imageUrl;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-center' })
    );
  }

  public openModal2(template: TemplateRef<any>, user: any): any {
    this.user = user;
    this.userForm.controls.userName.setValue(this.user.userName);
    this.userForm.controls.userName.disable();
    // this.userForm.controls.branch.disable();
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'white' })
    );
  }

  filterCustomer(searchTerm: string): any {
    if (searchTerm) {
      return this.filteredUsers.filter(
        (user) =>
          user.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1 ||
          user.userEmail.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    }
  }
  checkArrayLength(array: Array<any>): any {
    return array.length ? true : false;
  }

  approveUsers(): any {
    this.router.navigate(['admin/approveusers']);
  }
  pageChanged(event): any {
    this.currentPage = event;
  }
  // exportto excel
  exportToExcel(): any {
    this.exportService.exportExcel(this.filteredUsers, 'users');
  }
  updateUserRole(template: any): any {
    const data = {
      userId: this.user.userId,
      userStatus: 2,
      roleId: null,
      userIdApprover: this.User.userId,
    };
    this.roles.forEach((role) => {
      if (this.userForm.controls.role.value === role.roleName) {
        data.roleId = role.roleId;
      }
    });
    this.userService.approveUser(data).subscribe(
      (res) => {
        this.posted = true;
        this.getUsers();
        this.modalService.hide();
        // this.alertService.success({
        //   html: '<b> Role edited successfully<b>',
        // });
      },
      (err) => {
        this.errored = true;
        this.modalService.hide();
        // this.alertService.danger({
        //   html: '<b> There was a problem<b>',
        // });
      }
    );
  }
  sort(item: string): any {
    this.key = item;
    this.reverse = !this.reverse;
  }
  loggedInUsers(): any {
    this.router.navigate(['admin/loggedin']);
  }
}
