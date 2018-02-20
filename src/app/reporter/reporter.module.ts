import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReporterListComponent } from './reporter-list/reporter-list.component';
import { ReporterDetailComponent } from './reporter-detail/reporter-detail.component';
import { ComponentModule } from '../components';
import { DirectiveModule } from '../directives';
import { SpinnerComponent } from '../directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    DirectiveModule
  ],
  declarations: [
    ReporterListComponent,
    ReporterDetailComponent
  ],
  exports: [
    ReporterListComponent,
    ReporterDetailComponent
  ],
  entryComponents: [
      SpinnerComponent
  ]
})
export class ReporterModule { }
