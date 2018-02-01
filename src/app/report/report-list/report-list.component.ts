import { Component, OnInit } from '@angular/core';
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
    'generatedReportId', 'date', 'title', 'description', 'reporter', 'host', 'status'
  ];

  public dataAliases: string[] = [
    'ID', 'Date', 'Title', 'Description', 'Reporter', 'Host', 'Status'
  ];

  constructor(
    private reportActionCreator: ReportActionCreator
  ) {
    this.reportActionCreator.GetLatestReport();
  }

  ngOnInit() {
    this.reportActionCreator.GetLatestReport();
  }

  onMoreClick(event) {
    console.log(event);
  }
}
