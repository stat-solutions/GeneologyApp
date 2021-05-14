import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'authpage', redirectTo: 'authpage/login', pathMatch: 'full' },

  { path: '', redirectTo: 'authpage/login', pathMatch: 'full' },
  {
    path: 'admindashboard',
    loadChildren: () =>
      import('./admin-module/admin-module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
