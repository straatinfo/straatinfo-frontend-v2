import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../components';
import { DesignDetailComponent } from './design-detail/design-detail.component';
import { MatSelectModule } from '@angular/material/select';
import { DirectiveModule } from '../directives';
import { SpinnerComponent } from '../directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    MatSelectModule,
    DirectiveModule
  ],
  declarations: [
    DesignDetailComponent,
  ],
  exports: [
    DesignDetailComponent,
  ],
  entryComponents: [
      SpinnerComponent
  ]
})
export class DesignModule { }
