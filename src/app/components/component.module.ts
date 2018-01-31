import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '../app.module';
import { InputBasicComponent } from './input/basic/input-basic.component';
import { TableBasicComponent } from './table/basic/table-basic.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    InputBasicComponent,
    TableBasicComponent
  ],
  declarations: [
    InputBasicComponent,
    TableBasicComponent
  ],
  entryComponents: []
})
export class ComponentModule {
}
