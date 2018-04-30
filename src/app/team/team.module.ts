import { MaterialModule } from 'app/app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../components';
import { DirectiveModule, SpinnerComponent } from '../directives';
import { MatSelectModule } from '@angular/material/select';
import { TeamPendingListComponent } from './team-pending-list/team-pending-list.component';
import { TeamSetupComponent } from './team-setup/team-setup.component';
import { AddTeamDialogComponent } from './add-team-dialog/add-team-dialog.component';
import { ReporterTeamOptionDialogComponent } from './reporter-team-option-dialog/reporter-team-option-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    DirectiveModule,
    MatSelectModule,
    MaterialModule
  ],
  declarations: [
    TeamPendingListComponent,
    TeamSetupComponent,
    AddTeamDialogComponent,
    ReporterTeamOptionDialogComponent
  ],
  exports: [
    TeamPendingListComponent,
    TeamSetupComponent,
    AddTeamDialogComponent,
    ReporterTeamOptionDialogComponent
  ],
  entryComponents: [
    SpinnerComponent,
    AddTeamDialogComponent,
    ReporterTeamOptionDialogComponent
  ]
})
export class TeamModule {}
