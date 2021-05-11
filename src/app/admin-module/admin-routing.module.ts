import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ApproveUsersComponent } from './components/approve-users/approve-users.component';
import { ViewLoggedinUsersComponent } from './components/view-loggedin-users/view-loggedin-users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesCoreAdminComponent } from './pages-core/pages-core-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {UsersComponent} from './components/users/users.component';
import { AdminGuard } from '../shared/services/route-guards/admin-guard.service';
const routes: Routes = [
  {
    path: 'admin',
    component: PagesCoreAdminComponent,
//    canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },

      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'approveusers',
        component: ApproveUsersComponent,
      },
      {
        path: 'loggedin',
        component: ViewLoggedinUsersComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'editprofile',
        component: EditProfileComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
