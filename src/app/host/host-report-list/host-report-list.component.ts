import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ReportActionCreator } from '../../store/action-creators';

@Component({
  selector: 'app-host-report-list',
  templateUrl: './host-report-list.component.html',
  styleUrls: ['./host-report-list.component.scss']
})
export class HostReportListComponent implements OnInit {

  private routeParamsSubscription: Subscription = null;

  @select(s => s.report.reports) reports;
  @select(s => s.report.spinner) reportSpinner;
  @select(s => s.table.page) page;

  public dataNames: string[] = [
      'generatedReportId', 'date', '_mainCategory', '_subCategory', '_reporter', 'finishedDate', '_host', 'status'
  ];

  public dataAliases: string[] = [
    'ID', 'Date', 'Main Category', 'Sub Category', 'Chat Name', 'Finished Date', 'Host', 'Status'
  ];

  constructor(
      private actvatedRoute: ActivatedRoute,
      private reportActionCreator: ReportActionCreator,
      private router: Router
  ) {
      //this.reportActionCreator.GetLatestReport();
  }

  // test

  ngOnInit() {
      this.routeParamsSubscription = this.actvatedRoute.params
        .subscribe(
        params => {
            this.reportActionCreator.GetLatestReportByHost(params._hostId);
        }
        );
  }

  onMoreClick(event) {
      this.reportActionCreator.SelectReport(event._id);
      this.router.navigate([`admin/report/${event._id}`]);
  }
}
