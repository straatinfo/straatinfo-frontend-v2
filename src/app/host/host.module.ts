import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HostListComponent } from './host-list/host-list.component';
import { HostDetailComponent } from './host-detail/host-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    HostListComponent,
    HostDetailComponent
  ],
  exports: [
    HostListComponent,
    HostDetailComponent
  ]
})
export class HostModule { }
