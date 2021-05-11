import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { ExportService } from 'src/app/shared/services/export.service';
// import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-view-loggedin-users',
  templateUrl: './view-loggedin-users.component.html',
  styleUrls: ['./view-loggedin-users.component.scss'],
})
export class ViewLoggedinUsersComponent implements OnInit {
  public modalRef: BsModalRef;
  loggedInUsers = [];
  filteredUsers = [];
  fileName = 'users.xlsx';
  searchUser: string;
  id: string;
  totalItems: number;
  currentPage = 1;
  pageSize = 9;
  age: number;
  key = 'userId';
  reverse = false;
  imageUrl: string;
  posted: boolean;
  errored: boolean;
  @ViewChild('exportTable') element: ElementRef;
  User = this.authService.loggedInUserInfo();

  constructor(
    private authService: AuthServiceService,
    private userService: UsersService,
    private modalService: BsModalService,
    private exportService: ExportService,
    // private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): any {
    this.getLoggedInUsers();
  }
  getLoggedInUsers(): any{
    this.userService.getLoggedInUsers().subscribe((loggedIn) => {
      if (loggedIn.length > 0) {
        this.loggedInUsers = loggedIn;
        this.filteredUsers = this.loggedInUsers;
        this.totalItems = this.loggedInUsers.length;
      }
    });
  }
  goToUsers(): any {
    this.router.navigate(['admin/users']);
  }
  checkLoggedInUsers(array: Array<any>): any {
    return array.length ? true : false;
  }
  getValue(event): any {
    // console.log(event.target.value);
    this.searchUser = event.target.value;
    if (event.target.value === '') {
      this.filteredUsers = this.loggedInUsers;
      this.totalItems = this.filteredUsers.length;
    } else {
      this.filteredUsers = this.filterCustomer(this.searchUser);
      this.totalItems = this.filteredUsers.length;
    }
  }

  filterCustomer(searchTerm: string): any {
    if (searchTerm) {
      return this.filteredUsers.filter(
        user =>  user.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1 ||
          user.userEmail.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        );
      }
  }

  pageChanged(event): any {
    this.currentPage = event;
  }

  sort(item: string): any {
    this.key = item;
    this.reverse = !this.reverse;
  }

  // modal method
  public openModal(template: TemplateRef<any>, imageUrl: string): any {
      this.imageUrl = imageUrl;
      this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-center' })
    );
  }
  exportToExcel(): any{
    this.exportService.exportExcel(this.filteredUsers, 'loggenInUsers');
  }
  logOut(id: number): any {
    this.userService.userLogOut(id).subscribe(
    (res) => {
      this.posted = true;
      this.getLoggedInUsers();
      // this.alertService.success({
      //   html: '<b> User was logged out successfully<b>',
      // });
    },
    (error) => {
      this.errored = true;
      // this.alertService.danger({
      //   html: '<b> There was a problem<b>',
      // });
    }
    );
  }

  approveUsers(): any {
    this.router.navigate(['admin/approveusers']);
  }
}

