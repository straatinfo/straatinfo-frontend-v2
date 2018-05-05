import { CanDeactivateGuard } from './../../guards/can-deactivate.guard';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import {
  ReportListComponent,
  ReportDetailComponent
} from '../../report';
import { ViewProfileComponent } from '../../profile';

export const HostRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
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
				path: 'profile',
        component: ViewProfileComponent,
        canDeactivate: [CanDeactivateGuard]
			}
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
