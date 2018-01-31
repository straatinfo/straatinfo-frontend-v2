import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HostListComponent } from './host-list/host-list.component';
import { ComponentModule } from '../components';
import { HostAddComponent } from './host-add/host-add.component';
import { HostDetailComponent } from './host-detail/host-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule
  ],
  declarations: [
    HostListComponent,
    HostAddComponent,
    HostDetailComponent
  ],
  exports: [
    HostListComponent,
    HostAddComponent,
    HostDetailComponent
  ]
})
export class HostModule { }
