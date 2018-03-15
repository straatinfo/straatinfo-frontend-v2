import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReporterListComponent } from './reporter-list/reporter-list.component';
import { ReporterDetailComponent } from './reporter-detail/reporter-detail.component';
import { ReporterTeamAddComponent } from './reporter-team-add/reporter-team-add.component';
import { ReporterTeamListComponent } from './reporter-team-list/reporter-team-list.component';
import { ReporterTeamPendingListComponent } from './reporter-team-pending-list/reporter-team-pending-list.component';
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
    ReporterTeamAddComponent,
    ReporterTeamListComponent,
    ReporterTeamPendingListComponent
  ],
  exports: [
    ReporterListComponent,
    ReporterDetailComponent,
    ReporterTeamAddComponent,
    ReporterTeamListComponent,
    ReporterTeamPendingListComponent
  ],
  entryComponents: [
    SpinnerComponent
  ]
})
export class ReporterModule { }
