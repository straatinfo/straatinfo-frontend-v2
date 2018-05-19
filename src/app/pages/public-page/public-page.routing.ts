import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { Routes } from '@angular/router';
import { ReportDetailComponent } from './../../report/report-detail/report-detail.component';
import { DashboardComponent } from './../../dashboard/dashboard.component';

export const PublicRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'report/:_id',
        component: ReportDetailComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
