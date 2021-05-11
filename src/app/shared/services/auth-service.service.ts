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
import { UsersService } from 'src/app/shared/services/users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


    pleaseLogin = false;
    private API_URL = "";
    private loggedInUser: string;
    private readonly ACCESS_TOKEN = 'ACCESS TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    constructor(
      private userService: UsersService,
      private http: HttpClient,
      private router: Router,
      private jwtHelper: JwtHelperService
      ) { }

    loginNormalUser(postData: any): any {
      return this.http.post<any>(`${this.API_URL}/api/user/loginUser`, postData, this.httpOptions)
        .pipe(
          // tap(tokens => console.log(`${tokens}`)),
          tap(tokens => this.doLoginUser(postData.userPhone1, tokens)),
          mapTo(true),
        );
    }


    testingTheTablePost(postData: FormGroup): any {
      return this.http.post<any>(`${this.API_URL}/api/auth/testTableData`, postData.value, this.httpOptions)
        .pipe(
          // tap(tokens => console.log(`${tokens}`)),
          // tap(tokens => this.doLoginUser(postData.value.main_contact_number, tokens)),
          // mapTo(true),
        );
    }

    isAgentRegistered(id: string): any {
          //  return of(true);
      const options1 = { params: new HttpParams().set('id', id) };
      return this.http.get<any>(`${this.API_URL}/api/auth/isAgentRegistered`, options1);
    }
    registerUser(postData: any): any {
      return this.http.post<any>(`${this.API_URL}/api/user/registerUser`, postData, this.httpOptions)
        .pipe(
          map((res: string) => res),
          tap(res => console.log(`AFTER MAP: ${res}`)),
        );
    }
    passwordChangeCode(postData): any{
      return this.http.post<any>(`${this.API_URL}/api/user/postPasswordChangeCode`, postData, this.httpOptions)
      .pipe(
        map((res: string) => res),
        tap(res => console.log(`AFTER MAP: ${res}`)),
      );
    }
    changePIN(postData: any): any {
      return this.http.post<any>(`${this.API_URL}/api/user/postChangePassword`, postData, this.httpOptions)
        .pipe(
          // tap(tokens => console.log(`${tokens}`)),
          // tap(tokens => this.doLoginUser(postData.value.main_contact_number, tokens)),
          // mapTo(true),
        );
    }
    // tslint:disable-next-line: typedef
    doLoginUser(phoneNubmer: string, tokens: Tokens): any {
      this.loggedInUser = phoneNubmer;
      this.storeTokens(tokens);
      this.setPleaseLogin(false);
    }

    doLogoutUser(): any {
      this.loggedInUser = null;
      this.router.navigate(['/authpage/login']);
      if (this.getPleaseLogin() === false) {
        this.userService.userLogOut(this.loggedInUserInfo().userId).subscribe(
          res => {
            // logout at the backend
          },
          err => {
            console.log(err);
          }
        );
      }
      this.removeTokens();
    }

    private removeTokens(): any {
      localStorage.removeItem(this.ACCESS_TOKEN);
      localStorage.removeItem(this.REFRESH_TOKEN);
    }

    isLoggedIn(): any {
      return !!this.getJwtToken();
    }
    loggedInUserInfo(): any {
      // console.log(this.jwtHelper.decodeToken(this.getJwtToken()));
      if (this.isLoggedIn()){
        const tk = this.jwtHelper.decodeToken(this.getJwtToken());
        return {
          userName: tk.userName,
          userId: tk.userId,
          userPhone: tk.userPhone1,
          roleId: tk.roleId,
          branchId: tk.branchId,
          branchType: tk.branchType,
          // branchId: 554,
        };
      }
  //     "userId": 10000009,
  // "userName": "Bazirake Augustine",
  // "userEmail": "augbazi@gmail.com",
  // "userStatus": 2,
  // "userPhone1": "0781331616",
  // "userEmailVerify": 2,
  // "branchId": 507,
  // "roleId": 99,
  // "iat": 1606637455,
  // "exp": 1922213455,
  // "aud": "10000009",
  // "iss": "::ffff:127.0.0.1"
    }

    getJwtToken(): any {
      return localStorage.getItem(this.ACCESS_TOKEN);
    }

    refreshToken(): any {
      // console.log('am refreshing');
      const exp = this.jwtHelper.decodeToken(this.getRefreshToken()).exp;
      // console.log(exp*1000);
      // console.log(Date.now());
      const bool = Date.now() >= exp * 1000  ? false : true;
      if (bool === true) {
        return this.http.post<any>(`${this.API_URL}/api/user/userRefreshToken`, {
          refreshToken: this.getRefreshToken()
        }).pipe(tap((tokens: Tokens) => {
          this.storeTokens(tokens);
        }),
        catchError(error => {
          if (error instanceof HttpErrorResponse){
            this.setPleaseLogin(true);
            return this.doLogoutUser();
          }
        }));
      } else if (bool === false) {
        this.setPleaseLogin(true);
        this.doLogoutUser();
        this.router.navigate(['/authpage/login']);
      }
    }
    setPleaseLogin(val: boolean): any {
      this.pleaseLogin = val;
    }
    getPleaseLogin(): any {
      return this.pleaseLogin;
    }
    storeJwtToken(accessToken: string): any {
      localStorage.setItem(this.ACCESS_TOKEN, accessToken);
    }

    getRefreshToken(): any {
      return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeTokens(tokens: Tokens): any {
      localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
      localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    }
}
