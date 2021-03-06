
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SessionService } from './session.service';
import { HostService } from './host.service';
import { DesignService } from './design.service';
import { ReportService } from './report.service';
import { ReporterService } from './reporter.service';
import { ReportTypeService } from './reportType.service';
import { CategoryService } from './category.service';
import { TeamService } from './team.service';
import { LanguageService } from './language.service';
import { DialogService } from './dialog.service';
import { RoutingState } from './router-state.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: []
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        SessionService,
        HostService,
        DesignService,
        ReportService,
        ReporterService,
        ReportTypeService,
        CategoryService,
        TeamService,
        DialogService,
        LanguageService,
        RoutingState
      ]
    }
  }
}
