import { NgModule, ModuleWithProviders } from '@angular/core';

import { SessionActionCreator } from './session.actioncreator';
import { HostActionCreator } from './host.actioncreator';
import { DesignActionCreator } from './design.actioncreator';
import { TableActionCreator } from './table.actioncreator';
import { ReportActionCreator } from './report.actioncreator';
import { ReporterActionCreator } from './reporter.actioncreator';

import { MiscActionCreator } from './misc.actioncreator';

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
        DesignActionCreator,
        TableActionCreator,
        ReportActionCreator,
        ReporterActionCreator,
        MiscActionCreator
      ]
    }
  }
}