import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReporterListComponent } from './reporter-list/reporter-list.component';
import { ReporterDetailComponent } from './reporter-detail/reporter-detail.component';
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
    ReporterListComponent,
    ReporterDetailComponent
  ],
  exports: [
    ReporterListComponent,
    ReporterDetailComponent
  ]
})
export class ReporterModule { }
