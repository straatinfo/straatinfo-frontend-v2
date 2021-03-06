import { ViewProfileComponent } from './../../profile/view-profile/view-profile.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import {
	HostListComponent,
	HostAddComponent,
	HostDetailComponent,
	HostReportListComponent,
	HostReporterListComponent,
	HostDesignComponent,
	HostDesignAddComponent,
	HostDesignDetailComponent,
	HostCategoryComponent
} from '../../host';
import { ReportListComponent, ReportDetailComponent } from '../../report';
import { ReporterListComponent, ReporterDetailComponent, ReporterTeamAddComponent, ReporterTeamListComponent, ReporterTeamPendingListComponent } from '../../reporter';
import { DesignDetailComponent, ReportTypeAComponent, ReportTypeBComponent, ReportTypeCComponent } from '../../design';
import { TeamPendingListComponent, TeamSetupComponent } from '../../team';

import { HostDetailGuard, CanDeactivateGuard } from '../../guards';

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
				canActivate: [HostDetailGuard],
				canDeactivate: [CanDeactivateGuard]
			},
			{
				path: 'host/design/:_hostId',
				component: HostDesignComponent,
			},
			{
				path: 'host/design/add/:_hostId',
				component: HostDesignAddComponent,
				canDeactivate: [CanDeactivateGuard]
			},
			{
				path: 'host/design/detail/:_id',
				component: HostDesignDetailComponent,
				canDeactivate: [CanDeactivateGuard]
			},
			{
				path: 'add-host',
				component: HostAddComponent,
				canDeactivate: [CanDeactivateGuard]
			},
			{
				path: 'host/report/:_hostId',
				component: HostReportListComponent,
				canDeactivate: [CanDeactivateGuard]
			},
			{
				path: 'host/report/details/:_hostId/:_id',
				component: ReportDetailComponent,
				canDeactivate: [CanDeactivateGuard]
			},
			{
				path: 'host/reporter/:_hostId',
				component: HostReporterListComponent,
			},
			{
				path: 'host/reporter/details/:_hostId/:_id',
				component: ReporterDetailComponent
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
				canDeactivate: [CanDeactivateGuard]
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
				component: TeamSetupComponent,
			},
			{
				path: 'reporter/add-team/:_reporterId',
				component: ReporterTeamAddComponent,
			},
			{
				path: 'design/report-type-a',
				component: ReportTypeAComponent
			},
			{
				path: 'design/report-type-b',
				component: ReportTypeBComponent
			},
			{
				path: 'design/report-type-c',
				component: ReportTypeCComponent
			},
			{
				path: 'profile',
				component: ViewProfileComponent
			}
		]
	},
	{
		path: '**',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	}
];
