import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HostListComponent } from '../host';

export const AdminRoutes: Routes = [
  { 
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'host-list',
    component: HostListComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
