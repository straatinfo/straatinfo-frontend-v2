import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { SpinnerDirective } from './spinner/spinner.directive';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [
    SpinnerDirective,
    SpinnerComponent
  ],
  declarations: [
    SpinnerComponent,
    SpinnerDirective
  ]
})
export class DirectiveModule {
  
}
