import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { HostListComponent,
        HostAddComponent,
        HostDetailComponent,
        HostReportListComponent,
        HostReporterListComponent,
        HostDesignComponent,
        HostDesignAddComponent,
        HostDesignDetailComponent,
        HostCategoryComponent} from '../../host';
import { ReportListComponent, ReportDetailComponent } from '../../report';
import { ReporterListComponent, ReporterDetailComponent, ReporterTeamAddComponent, ReporterTeamListComponent } from '../../reporter';
import { DesignDetailComponent  } from '../../design';
import { TeamPendingListComponent } from '../../team';

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
          path: 'host/design/:_hostId',
          component: HostDesignComponent,
      },
      {
          path: 'host/design/add/:_hostId',
          component: HostDesignAddComponent,
      },
      {
          path: 'host/design/detail/:_id',
          component: HostDesignDetailComponent,
      },
      {
        path: 'add-host',
        component: HostAddComponent
      },
      {
          path: 'host/report/:_hostId',
          component: HostReportListComponent,
      },
      {
          path: 'host/reporter/:_hostId',
          component: HostReporterListComponent,
      },
      {
          path: 'host/category/:_hostId',
          component: HostCategoryComponent,
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
      {
          path: 'reporter/team/:_reporterId',
          component: ReporterTeamListComponent,
      },
      {
          path: 'reporter/add-team/:_reporterId',
          component: ReporterTeamAddComponent,
      },
      {
          path: 'design',
          component: DesignDetailComponent,
      },
      {
        path: 'pending-team',
        component: TeamPendingListComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
