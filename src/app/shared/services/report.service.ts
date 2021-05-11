import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  API_URL = "";

  constructor(private http: HttpClient) {}
  getComprehensiveReport(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/reports/getComprehensiveReport`, postData);
  }
  getRunningLoansReport(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/reports/getRunningLoansReport`, postData);
  }
  getDisbursedLoansReport(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/reports/getDisbursedLoansReport`, postData);
  }
  getRejectedLoansReport(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/reports/getRejectedLoansReport`, postData);
  }
  getApproveddLoansReport(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/reports/getApproveddLoansReport`, postData);
  }
  getReceivedLoansReport(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/reports/getReceivedLoansReport`, postData);
  }
  getForwardedLoansReport(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/reports/getForwardedLoansReport`, postData);
  }
  getDefferedLoansReport(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/reports/getDefferedLoansReport`, postData);
  }
  getRunningLoansByBranchReport(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/reports/getRunningLoansByBranchReport`, postData);
  }
  getRunningLoansByMovementStageReport(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/reports/getRunningLoansByMovementStageReport`, postData);
  }
  getRunningLoansByUserReport(postData: any): any {
    return this.http.post<any>(`${this.API_URL}/api/reports/getRunningLoansByUserReport`, postData);
  }

  getTotalNumberOfRunningLoans(): any {
    return this.http.get<any>(`${this.API_URL}/api/reports/getTotalNumberOfRunningLoans`);
  }
  getTotalNumberOfRunningLoansByBranch(id: number): any {
    return this.http.get<any>(`${this.API_URL}/api/reports/getTotalNumberOfRunningLoansByBranch?branchId=${id}`);
  }
  getTotalNumberOfApprovedLoans(): any {
    return this.http.get<any>(`${this.API_URL}/api/reports/getTotalNumberOfApprovedLoans`);
  }
  getTotalNumberOfApprovedLoansByBranch(id: number): any {
    return this.http.get<any>(`${this.API_URL}/api/reports/getTotalNumberOfApprovedLoansByBranch?branchId=${id}`);
  }
  getTotalNumberOfDefferedLoans(): any {
    return this.http.get<any>(`${this.API_URL}/api/reports/getTotalNumberOfDefferedLoans`);
  }
  getTotalNumberOfDefferedLoansByBranch(id: number): any {
    return this.http.get<any>(`${this.API_URL}/api/reports/getTotalNumberOfDefferedLoansByBranch?branchId=${id}`);
  }
  getTotalNumberOfDisbursedLoans(): any {
    return this.http.get<any>(`${this.API_URL}/api/reports/getTotalNumberOfDisbursedLoans`);
  }
  getTotalNumberOfDisbursedLoansByBranch(id: number): any {
    return this.http.get<any>(`${this.API_URL}/api/reports/getTotalNumberOfDisbursedLoansByBranch?branchId=${id}`);
  }
  getTotalNumberOfRejectedLoans(): any {
    return this.http.get<any>(`${this.API_URL}/api/reports/getTotalNumberOfApprovedLoans`);
  }
  getTotalNumberOfRejectedLoansByBranch(id: number): any {
    return this.http.get<any>(`${this.API_URL}/api/reports/getTotalNumberOfRejectedLoansByBranch?branchId=${id}`);
  }
}
