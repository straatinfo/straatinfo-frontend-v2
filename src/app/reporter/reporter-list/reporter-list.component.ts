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
      'fname', 'lname', '_chat', 'isVolunteer', '_team', '_host'
  ];

  public dataAliases: string[] = [
      'First Name', 'Last Name', 'Chat Name', 'Volunteer', 'Team', 'Host'
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
      this.reporterActionCreator.SelectReporter(event._id);
      this.router.navigate([`admin/reporter/${event._id}`]);
  }
}
