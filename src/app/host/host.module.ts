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
import { HostDesignDetailComponent } from './host-design-detail/host-design-detail.component';
import { HostDesignAddComponent } from './host-design-add/host-design-add.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { DirectiveModule } from '../directives';
import { SpinnerComponent } from '../directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    ColorPickerModule,
    DirectiveModule
  ],
  declarations: [
    HostListComponent,
    HostAddComponent,
    HostDetailComponent,
    HostReportListComponent,
    HostReporterListComponent,
    HostDesignComponent,    
    HostDesignDetailComponent,
    HostDesignAddComponent
  ],
  exports: [
    HostListComponent,
    HostAddComponent,
    HostDetailComponent,
    HostReportListComponent,
    HostReporterListComponent,
    HostDesignComponent,
    HostDesignDetailComponent,
    HostDesignAddComponent
  ],
  entryComponents: [
    SpinnerComponent
  ]
})
export class HostModule { }
