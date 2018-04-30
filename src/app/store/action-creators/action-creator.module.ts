import { NgModule, ModuleWithProviders } from '@angular/core';

import { SessionActionCreator } from './session.actioncreator';
import { HostActionCreator } from './host.actioncreator';
import { DesignActionCreator } from './design.actioncreator';
import { TableActionCreator } from './table.actioncreator';
import { ReportActionCreator } from './report.actioncreator';
import { ReporterActionCreator } from './reporter.actioncreator';
import { ReportTypeActionCreator } from './reportType.actioncreator';
import { CategoryActionCreator } from './category.actioncreator';
import { TeamActionCreator } from './team.actioncreator';
import { MiscActionCreator } from './misc.actioncreator';
import { LanguageActionCreator } from './language.actioncreator';

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
        ReportTypeActionCreator,
        CategoryActionCreator,
        TeamActionCreator,
        MiscActionCreator,
        LanguageActionCreator
      ]
    }
  }
}