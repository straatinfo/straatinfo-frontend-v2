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
    DesignModule
  ],
  declarations: [
  ],
  entryComponents: [
  ]
})

export class AdminPageModule {}
