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
  private hostSubscription: Subscription = null;

  @select(s => s.reporter.reporters) reporters;
  @select(s => s.reporter.spinner) reporterSpinner;
  @select(s => s.table.page) page;
  @select(s => s.host.selectedHost) selectedHost;

  public hostName: string;
  public hostId: string;

  public dataNames: string[] = [
      'fname', 'lname', '_chat', 'isVolunteer', '_team'
  ];

  public dataAliases: string[] = [
      'First Name', 'Last Name', 'Chat Name', 'Volunteer', 'Team'
  ];

  constructor(
      private actvatedRoute: ActivatedRoute,
      private reporterActionCreator: ReporterActionCreator,
      private router: Router
  ) {
  }

  ngOnInit() {
    this.routeParamsSubscription = this.actvatedRoute.params
    .subscribe(
        params => {
            this.hostId = params._hostId;
            this.reporterActionCreator.GetLatestReporterByHost(params._hostId);
        }
      );

    this.hostSubscription = this.selectedHost
        .subscribe(host => {
            this.hostName = host.hostName;
        });
  }

  onBack() {
      this.router.navigate([`admin/host/${this.hostId}`]);
  }

  onMoreClick(event) {
      this.reporterActionCreator.SelectReporter(event._id);
      this.router.navigate([`admin/reporter/${event._id}`]);
  }
}
