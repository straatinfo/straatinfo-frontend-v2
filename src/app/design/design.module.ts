import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../app.module';
import { ComponentModule } from '../components';
import { DesignDetailComponent } from './design-detail/design-detail.component';
import { MatSelectModule } from '@angular/material/select';
import { DirectiveModule } from '../directives';
import { SpinnerComponent, LoadingBarComponent } from '../directives';
import { ReportTypeAComponent } from './report-type-a/report-type-a.component';
import { MainCategoryAddModalComponent } from './main-category-add/main-category-add-modal.component';
import { SubCategoryAddModalComponent } from './sub-category-add/sub-category-add-modal.component';
import { ReportTypeBComponent } from './report-type-b/report-type-b.component';
import { ReportTypeCComponent } from './report-type-c/report-type-c.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ComponentModule,
    MatSelectModule,
    DirectiveModule
  ],
  declarations: [
    DesignDetailComponent,
    ReportTypeAComponent,
    MainCategoryAddModalComponent,
    SubCategoryAddModalComponent,
    ReportTypeBComponent,
    ReportTypeCComponent
  ],
  exports: [
    DesignDetailComponent,
    ReportTypeAComponent,
    MainCategoryAddModalComponent,
    SubCategoryAddModalComponent,
    ReportTypeBComponent,
    ReportTypeCComponent
  ],
  entryComponents: [
      SpinnerComponent,
      LoadingBarComponent,
      MainCategoryAddModalComponent,
      SubCategoryAddModalComponent
  ]
})
export class DesignModule { }
