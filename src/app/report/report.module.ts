import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ComponentModule } from '../components';
import { DirectiveModule, SpinnerComponent, LoadingBarComponent } from '../directives';

/* Angular Google Map */
import { AgmCoreModule } from '@agm/core';
import { MaterialModule } from 'app/app.module';

import { PipeModule } from './../pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    MaterialModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDuQd44hbjRx-70DSsFUWuAtt2uMe_Hotk' // Change this to a new apiKey
    }),
    DirectiveModule,
    PipeModule
  ],
  declarations: [
    ReportListComponent,
    ReportDetailComponent
  ],
  exports: [
    ReportListComponent,
    ReportDetailComponent
  ],
  entryComponents: [
    SpinnerComponent,
    LoadingBarComponent
  ]
})
export class ReportModule { }
