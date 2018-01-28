import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberRoutes } from './member-page.routing';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MemberRoutes),
    FormsModule,
    ReactiveFormsModule,
    DashboardModule
  ],
  declarations: [
  ],
  entryComponents: [
  ]
})

export class MemberModule {}
