import { MaterialModule } from './../app.module';
import { MatSelectModule } from '@angular/material/select';
import { ColorPickerModule } from 'ngx-color-picker';
import { ComponentModule } from './../components/component.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent, DirectiveModule } from '../directives';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { HostProfileComponent } from './host-profile/host-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentModule,
    ColorPickerModule,
    DirectiveModule,
    MatSelectModule,
    MaterialModule
  ],
  declarations: [
    ViewProfileComponent,
    HostProfileComponent,
    AdminProfileComponent,
    ChangePasswordDialogComponent
  ],
  exports: [
    ViewProfileComponent,
    ChangePasswordDialogComponent
  ],
  entryComponents: [
    SpinnerComponent,
    ChangePasswordDialogComponent
  ]
})
export class ProfileModule { }
