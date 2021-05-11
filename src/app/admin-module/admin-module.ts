import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ViewLoggedinUsersComponent } from './components/view-loggedin-users/view-loggedin-users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  AdminRoutingModule} from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeftPanelAdminComponent } from './common/left-panel/left-panel-admin.component';
import { RightPanelAdminComponent } from './common/right-panel/right-panel-admin.component';
import { HeaderAdminComponent } from './common/header/header-admin.component';
import { ContentSectionAdminComponent } from './content-section/content-section-admin.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {ApproveUsersComponent} from './components/approve-users/approve-users.component';
import {UsersComponent} from './components/users/users.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from '@full-fledged/alerts';

@NgModule({
  declarations: [
    PagesCoreAdminComponent,
    LeftPanelAdminComponent,
    RightPanelAdminComponent,
    HeaderAdminComponent,
    ContentSectionAdminComponent,
    DashboardComponent,
    ApproveUsersComponent,
    ViewLoggedinUsersComponent,
    ReportsComponent,
    EditProfileComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DatepickerModule,
    NgbModule,
    BsDatepickerModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 7000 }),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
})
export class AdminModule {}
