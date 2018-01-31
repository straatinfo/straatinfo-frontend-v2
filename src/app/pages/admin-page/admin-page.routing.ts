import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { HostListComponent, HostAddComponent, HostDetailComponent } from '../../host';

export const AdminRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'host',
        component: HostListComponent
      },
      {
        path: 'host/:id',
        component: HostDetailComponent
      },
      {
        path: 'add-host',
        component: HostAddComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
