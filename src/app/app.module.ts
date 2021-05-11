import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin-module/admin-module';
import { AuthModule } from './auth-module/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireMessagingModule } from '@angular/fire/messaging';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    AdminModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
SharedModule,
    AppRoutingModule,
    AdminModule,
    AuthModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    NgbModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    // AngularFireMessagingModule,
    JwtModule.forRoot({
      config: {
        //   tokenGetter: () => {
        //   //   // ;
        //   // },
        //   allowedDomains: ["localhost:4200/"],
        //   disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: InterceptorService,
    //   multi: true,
    // },
    // SharedModule,
    AsyncPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
