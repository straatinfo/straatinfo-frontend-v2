import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutes } from './admin-page.routing';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { HostModule } from '../../host';
import { ReportModule } from '../../report';
import { ReporterModule } from '../../reporter';
import { DesignModule } from '../../design';
import { TeamModule } from '../../team';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    HostModule,
    ReportModule,
    ReporterModule,
    DesignModule,
    TeamModule
  ],
  declarations: [
  ],
  entryComponents: [
  ]
})

export class AdminPageModule {}
