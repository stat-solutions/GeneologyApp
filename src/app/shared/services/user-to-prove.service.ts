import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable, throwError, of } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpParams, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Tokens } from '../models/tokens';
import { map, tap, catchError, mapTo } from 'rxjs/operators';
import { UserRole } from '../models/user-role';
// import { RegisterUser } from '../models/register';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class UserToProveService {
  private API_URL = "";

  constructor(private http: HttpClient, private router: Router) {}
  getUserForApproval(): any {
    return this.http.get<any>(`${this.API_URL}/api/user/getUsersForApproval`);
  }

  approveUser(postData: any): any {
    // console.log(object);
    return this.http.post<any>(`${this.API_URL}/api/user/putApproveUser`, postData)
        .pipe(
          tap(res => console.log(`AFTER MAP: ${res}`)),
          // catchError(this.handleCompanySetupError)
        );

  }
  rejectUser(postData: any): any {
    // console.log(object);
    return this.http.post<any>(`${this.API_URL}/api/user/putRejectUserApproval`, postData)
        .pipe(
          tap(res => console.log(`AFTER MAP: ${res}`)),
          // catchError(this.handleCompanySetupError)
        );
  }
}
