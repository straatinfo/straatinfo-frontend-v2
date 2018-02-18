import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { ReportActionCreator } from '../../store/action-creators';
import { ISession } from 'app/interface/session/session.interface';
import { IRole } from 'app/interface/role/role.interface';
import { IHost } from 'app/interface/host/host.interface';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  @select(s => s.report.reports) reports;
  @select(s => s.report.spinner) reportSpinner;
  @select(s => s.table.page) page;

  public session: ISession = JSON.parse(localStorage.getItem('session'));
  public _role: IRole = this.session.user._role;
  public _host: IHost = this.session.user;

  public dataNames: string[] = [
      'generatedReportId', 'date', '_mainCategory', '_subCategory', '_reporter', 'finishedDate', '_host', 'status'
  ];

  public dataAliases: string[] = [
      'ID', 'Date', 'Main Category', 'Sub Category', 'Chat Name', 'Finished Date', 'Host', 'Status'
  ];

  constructor(
      private reportActionCreator: ReportActionCreator,
      private router: Router
  ) { }

  ngOnInit() {
    if (this._role.code.toUpperCase() === 'ADMIN') {
      this.reportActionCreator.GetLatestReport();
    } else {
      this.reportActionCreator.GetLatestReportByHost(this._host._id);
    }
  }

  onMoreClick(event) {
      this.reportActionCreator.SelectReport(event._id);
      if (this._role.code.toLocaleUpperCase() === 'ADMIN') {
        this.router.navigate([`admin/report/${event._id}`]);
      } else {
        this.router.navigate([`host/report/${event._id}`]);
      }
  }
}
