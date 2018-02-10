import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ComponentModule } from '../components';

/* Angular Google Map */
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBTuSniFR4-7NIkjbbfPMsd4SM4GyKcIEA'
    })
  ],
  declarations: [
    ReportListComponent,
    ReportDetailComponent
  ],
  exports: [
    ReportListComponent,
    ReportDetailComponent
  ]
})
export class ReportModule { }
