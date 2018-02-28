import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../components';
import { DirectiveModule, SpinnerComponent } from '../directives';
import { MatSelectModule } from '@angular/material/select';
import { TeamPendingListComponent } from './team-pending-list/team-pending-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    DirectiveModule,
    MatSelectModule
  ],
  declarations: [
    TeamPendingListComponent
  ],
  exports: [
    TeamPendingListComponent
  ],
  entryComponents: [
    SpinnerComponent
  ]
})
export class TeamModule {}
