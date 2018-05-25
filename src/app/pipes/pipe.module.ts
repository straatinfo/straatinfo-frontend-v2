import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from './translation.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TranslationPipe
  ],
  exports: [
    TranslationPipe
  ]
})
export class PipeModule { }
