import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { ComponentModule } from '../components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule
  ],
  declarations: [
    ReportListComponent
  ],
  exports: [
    ReportListComponent
  ]
})
export class ReportModule { }
