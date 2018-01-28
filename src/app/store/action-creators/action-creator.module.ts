import { NgModule, ModuleWithProviders } from '@angular/core';

import { SessionActionCreator } from './session.actioncreator';


@NgModule({
  imports: [],
  declarations: []
})
export class ActionCreatorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ActionCreatorModule,
      providers: [
        SessionActionCreator
      ]
    }
  }
}