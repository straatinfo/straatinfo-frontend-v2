import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostRoutes } from './host-page.routing';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HostRoutes),
    FormsModule,
    ReactiveFormsModule,
    DashboardModule
  ],
  declarations: [
  ],
  entryComponents: [
  ]
})

export class HostPageModule {}
