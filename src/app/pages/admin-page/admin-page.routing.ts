import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { HostListComponent, HostAddComponent, HostDetailComponent, HostReportListComponent, HostReporterListComponent, HostDesignComponent } from '../../host';
import { ReportListComponent, ReportDetailComponent  } from '../../report';
import { ReporterListComponent, ReporterDetailComponent  } from '../../reporter';

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
        path: 'host/:_id',
        component: HostDetailComponent,
        canActivate: [HostDetailGuard]
      },
      {
          path: 'host-design/:_id',
          component: HostDesignComponent,
      },
      {
        path: 'add-host',
        component: HostAddComponent
      },
      {
          path: 'host-report/:_hostId',
          component: HostReportListComponent,
      },
      {
          path: 'host-reporter/:_hostId',
          component: HostReporterListComponent,
      },
      {
        path: 'report',
        component: ReportListComponent
      },
      {
        path: 'report/:_id',
        component: ReportDetailComponent,
      },
      {
          path: 'reporter',
          component: ReporterListComponent
      },
      {
          path: 'reporter/:_id',
          component: ReporterDetailComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
