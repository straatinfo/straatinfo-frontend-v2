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
import { HostCategoryComponent } from './host-category/host-category.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { DirectiveModule, LoadingBarComponent } from '../directives';
import { SpinnerComponent } from '../directives';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '../app.module';
import { MainCategoryAddModalComponent, SubCategoryAddModalComponent } from '../design';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    ColorPickerModule,
    DirectiveModule,
    MatSelectModule,
    MaterialModule
  ],
  declarations: [
    HostListComponent,
    HostAddComponent,
    HostDetailComponent,
    HostReportListComponent,
    HostReporterListComponent,
    HostDesignComponent,    
    HostDesignDetailComponent,
    HostDesignAddComponent,
    HostCategoryComponent
  ],
  exports: [
    HostListComponent,
    HostAddComponent,
    HostDetailComponent,
    HostReportListComponent,
    HostReporterListComponent,
    HostDesignComponent,
    HostDesignDetailComponent,
    HostDesignAddComponent,
    HostCategoryComponent
  ],
  entryComponents: [
    SpinnerComponent,
    LoadingBarComponent,
    MainCategoryAddModalComponent,
    SubCategoryAddModalComponent
  ]
})
export class HostModule { }
