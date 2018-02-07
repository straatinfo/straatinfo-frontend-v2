import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HostListComponent } from './host-list/host-list.component';
import { ComponentModule } from '../components';
import { HostAddComponent } from './host-add/host-add.component';
import { HostDetailComponent } from './host-detail/host-detail.component';
import { HostReportListComponent } from './host-report-list/host-report-list.component';
import { HostReporterListComponent } from './host-reporter-list/host-reporter-list.component';
import { HostDesignComponent } from './host-design/host-design.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    ColorPickerModule
  ],
  declarations: [
    HostListComponent,
    HostAddComponent,
    HostDetailComponent,
    HostReportListComponent,
    HostReporterListComponent,
    HostDesignComponent,    
  ],
  exports: [
    HostListComponent,
    HostAddComponent,
    HostDetailComponent,
    HostReportListComponent,
    HostReporterListComponent,
    HostDesignComponent
  ]
})
export class HostModule { }
