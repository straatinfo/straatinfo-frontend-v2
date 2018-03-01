import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { SpinnerDirective } from './spinner/spinner.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingBarDirective } from './loading-bar/loading-bar.directive';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [
    SpinnerDirective,
    SpinnerComponent,
    LoadingBarDirective,
    LoadingBarComponent
  ],
  declarations: [
    SpinnerComponent,
    SpinnerDirective,
    LoadingBarDirective,
    LoadingBarComponent
  ]
})
export class DirectiveModule {
  
}
