import { NgModule, ModuleWithProviders } from '@angular/core';

import { SessionActionCreator } from './session.actioncreator';
import { HostActionCreator } from './host.actioncreator';
import { TableActionCreator } from './table.actioncreator';
import { ReportActionCreator } from './report.actioncreator';
import { ReporterActionCreator } from './reporter.actioncreator';

@NgModule({
  imports: [],
  declarations: []
})
export class ActionCreatorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ActionCreatorModule,
      providers: [
        SessionActionCreator,
        HostActionCreator,
        TableActionCreator,
        ReportActionCreator,
        ReporterActionCreator
      ]
    }
  }
}