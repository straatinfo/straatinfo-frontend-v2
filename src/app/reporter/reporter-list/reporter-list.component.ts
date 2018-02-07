import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { ReporterActionCreator } from '../../store/action-creators';

@Component({
  selector: 'app-report-list',
  templateUrl: './reporter-list.component.html',
  styleUrls: ['./reporter-list.component.scss']
})
export class ReporterListComponent implements OnInit {

  @select(s => s.reporter.reporters) reporters;
  @select(s => s.reporter.spinner) reporterSpinner;
  @select(s => s.table.page) page;

  public dataNames: string[] = [
      'firstName', 'lastName', '_chat', 'isVolunteer', '_team', '_host', 'status1', 'status2'
  ];

  public dataAliases: string[] = [
      'First Name', 'Last Name', 'Chat Name', 'Volunteer', 'Team', 'Host', 'Status1', 'Status2'
  ];

  constructor(
      private reporterActionCreator: ReporterActionCreator,
      private router: Router
  ) {
    this.reporterActionCreator.GetLatestReporter();
  }

  ngOnInit() {
    this.reporterActionCreator.GetLatestReporter();
  }

  onMoreClick(event) {
      this.reporterActionCreator.SelectReporter(event.id);
      this.router.navigate([`admin/reporter/${event.id}`]);
  }
}
