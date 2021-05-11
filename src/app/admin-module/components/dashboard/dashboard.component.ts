import { Component, OnInit, TemplateRef,  ElementRef , ViewChild} from '@angular/core';
import * as moment from 'moment';
import {FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExportService } from 'src/app/shared/services/export.service';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { ReportService } from 'src/app/shared/services/report.service';

@Component({
  selector: 'app-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public modalRef: BsModalRef;
  loanTable = [];
  filteredLoans = [];
  specificLoanTable: any;
  searchCustomer: string;
  totalItems: number;
  id: string;
  currentPage = 1;
  pageSize = 10;
  age: number;
  key = "Id";
  csvTable = [];
  reverse = false;
  running: number;
  approved: number;
  deferred: number;
  disbursed: number;
  rejected: number;
  User = this.authService.loggedInUserInfo();
  constructor(
    private modalService: BsModalService,
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private reports: ReportService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.User = this.authService.loggedInUserInfo();
    if (this.User.branchType === 'BRANCH'){
      const branchId = this.User.branchId;
      this.reports.getTotalNumberOfRunningLoansByBranch(branchId).subscribe(res => this.running = res);
      this.reports.getTotalNumberOfApprovedLoansByBranch(branchId).subscribe(res => this.approved = res);
      this.reports.getTotalNumberOfDefferedLoansByBranch(branchId).subscribe(res => this.deferred = res);
      this.reports.getTotalNumberOfDisbursedLoansByBranch(branchId).subscribe(res => this.disbursed = res);
      this.reports.getTotalNumberOfRejectedLoansByBranch(branchId).subscribe(res => this.rejected = res);
    } else {
      this.reports.getTotalNumberOfRunningLoans().subscribe(res => this.running = res);
      this.reports.getTotalNumberOfApprovedLoans().subscribe(res => this.approved = res);
      this.reports.getTotalNumberOfDefferedLoans().subscribe(res => this.deferred = res);
      this.reports.getTotalNumberOfDisbursedLoans().subscribe(res => this.disbursed = res);
      this.reports.getTotalNumberOfRejectedLoans().subscribe(res => this.rejected = res);
    }
  }


  checkTable(array: Array<any>): any {
    return array.length ? true : false;
  }

  checkLoanStatus(array: Array<any>, loanStatus: string): any {
    return array.filter((userData) => userData.LoanStatus === loanStatus)
      .length;
  }

  getValue(event): any {
    this.searchCustomer = event.target.value;
    if (event.target.value === '') {
      this.filteredLoans = this.loanTable;
      this.totalItems = this.filteredLoans.length;
    } else {
      this.filteredLoans = this.filterCustomer(this.searchCustomer);
      this.totalItems = this.filteredLoans.length;
    }
  }
  filterCustomer(searchTerm: string): any {
    if (searchTerm) {
      return this.filteredLoans.filter(
        (loan) =>
          loan.loanId.toString().indexOf(searchTerm) !==
            -1 ||
          loan.loanAmount.toString().indexOf(searchTerm) !==
            -1 ||
          loan.customerIdNumber.indexOf(searchTerm) !==
            -1 ||
          loan.customerIdType.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          loan.customerName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          loan.loanThresholdType.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1 ||
          loan.loanThresholdProduct.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
          || loan.loanOriginatingBranch.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
          || loan.movementStage.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    }
  }

  clickOnCustomer(id: number): any{
        this.router.navigate(['admin/customerdetails', id], );
  }
   pageChanged(event): any{
     this.currentPage = event;
     console.log(this.filteredLoans.length);
     // get
     // if(currentPage )

   }

  public openModal(template: TemplateRef<any>, id: number, index: number): any {
  }
  // exportto excel
  exportToExcel(): any{
    this.exportService.exportExcel(this.filteredLoans, 'Loans');
  }

  sort(item: string): any{
    this.key = item;
    this.reverse = !this.reverse;
  }
  Number(val: string): any{
    return Number(val);
  }
}
