import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '../app.module';
import { InputBasicComponent } from './input/basic/input-basic.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    InputBasicComponent
  ],
  declarations: [
    InputBasicComponent
  ],
  entryComponents: []
})
export class ComponentModule {
}
