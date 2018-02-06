import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ReporterActionCreator } from '../../store/action-creators';

@Component({
  selector: 'app-host-report-list',
  templateUrl: './host-reporter-list.component.html',
  styleUrls: ['./host-reporter-list.component.scss']
})
export class HostReporterListComponent implements OnInit {

  private routeParamsSubscription: Subscription = null;

  @select(s => s.reporter.reporters) reporters;
  @select(s => s.reporter.spinner) reporterSpinner;
  @select(s => s.table.page) page;

  public dataNames: string[] = [
      'firstName', 'lastName', 'chatName', 'volunteer', 'team', 'host', 'status1', 'status2'
  ];

  public dataAliases: string[] = [
      'First Name', 'Last Name', 'Chat Name', 'Volunteer', 'Team', 'Host', 'Status1', 'Status2'
  ];

  constructor(
      private actvatedRoute: ActivatedRoute,
      private reporterActionCreator: ReporterActionCreator,
      private router: Router
  ) {
    //this.reporterActionCreator.GetLatestReporter();
  }

  ngOnInit() {
    this.routeParamsSubscription = this.actvatedRoute.params
    .subscribe(
        params => {
            this.reporterActionCreator.GetLatestReporterByHost(params._hostId);
        }
    );
  }

  onMoreClick(event) {
      this.reporterActionCreator.SelectReporter(event._id);
      this.router.navigate([`admin/reporter/${event._id}`]);
  }
}
