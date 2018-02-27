import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReporterListComponent } from './reporter-list/reporter-list.component';
import { ReporterDetailComponent } from './reporter-detail/reporter-detail.component';
import { ReporterTeamAddComponent } from './reporter-team-add/reporter-team-add.component';
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
    ReporterDetailComponent,
    ReporterTeamAddComponent
  ],
  exports: [
    ReporterListComponent,
    ReporterDetailComponent,
    ReporterTeamAddComponent
  ],
  entryComponents: [
    SpinnerComponent
  ]
})
export class ReporterModule { }
