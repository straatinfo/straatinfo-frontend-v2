
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [
    DashboardComponent
  ],
  exports: [

  ]
})
export class DashboardModule { }
