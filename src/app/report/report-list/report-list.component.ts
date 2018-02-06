import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { ReportActionCreator } from '../../store/action-creators';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  @select(s => s.report.reports) reports;
  @select(s => s.report.spinner) reportSpinner;
  @select(s => s.table.page) page;

  public dataNames: string[] = [
    'generatedReportId', 'date', 'title', 'description', '_reporter', '_host', 'status'
  ];

  public dataAliases: string[] = [
    'ID', 'Date', 'Title', 'Description', 'Reporter', 'Host', 'Status'
  ];

  constructor(
      private reportActionCreator: ReportActionCreator,
      private router: Router
  ) {
    this.reportActionCreator.GetLatestReport();
  }

  ngOnInit() {
    this.reportActionCreator.GetLatestReport();
  }

  onMoreClick(event) {
      this.reportActionCreator.SelectReport(event._id);
      this.router.navigate([`admin/report/${event._id}`]);
  }
}
