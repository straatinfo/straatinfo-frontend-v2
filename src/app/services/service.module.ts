import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SessionService } from './session.service';
import { HostService } from './host.service';
import { HostDesignService } from './host-design.service';
import { ReportService } from './report.service';
import { ReporterService } from './reporter.service';

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
        HostDesignService,
        ReportService,
        ReporterService
      ]
    }
  }
}
