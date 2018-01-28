import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HostListComponent } from './host-list/host-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HostListComponent
  ],
  exports: [
    HostListComponent
  ]
})
export class HostModule { }
