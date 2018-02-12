import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../components';
import { DesignDetailComponent } from './design-detail/design-detail.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    MatSelectModule
  ],
  declarations: [
    DesignDetailComponent,
  ],
  exports: [
    DesignDetailComponent,
  ]
})
export class DesignModule { }
