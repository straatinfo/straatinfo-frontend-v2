import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { HostListComponent, HostAddComponent, HostDetailComponent } from '../../host';
import { ReportListComponent } from '../../report';

import { HostDetailGuard } from '../../guards';

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
        component: HostDetailComponent,
        canActivate: [HostDetailGuard]
      },
      {
        path: 'add-host',
        component: HostAddComponent
      },
      {
        path: 'report',
        component: ReportListComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
