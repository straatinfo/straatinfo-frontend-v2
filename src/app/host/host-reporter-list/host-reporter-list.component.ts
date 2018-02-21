import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ReporterActionCreator } from '../../store/action-creators';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-host-report-list',
  templateUrl: './host-reporter-list.component.html',
  styleUrls: ['./host-reporter-list.component.scss']
})
export class HostReporterListComponent implements OnInit {

  private routeParamsSubscription: Subscription = null;
  private hostSubscription: Subscription = null;
  private reporterSubscription: Subscription = null;

  @select(s => s.reporter.reporters) reporters;
  @select(s => s.reporter.spinner) reporterSpinner;
  @select(s => s.table.page) page;
  @select(s => s.host.selectedHost) selectedHost;

  public hostName: string;
  public hostId: string;
  public reporterData = [];

  public dataNames: string[] = [
      'fname', 'lname', 'chatName', 'isVolunteer', 'activeTeamName'
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

    this.reporterSubscription = this.reporters
        .subscribe(reporter => {
            this.reporterData = reporter;
        });
  }

  onBack() {
      this.router.navigate([`admin/host/${this.hostId}`]);
  }

  onMoreClick(event) {
      this.reporterActionCreator.SelectReporter(event._id);
      this.router.navigate([`admin/reporter/${event._id}`]);
  }

  onDownload() {
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = this.padLeft((date.getMonth() + 1).toString(), '0', 2);
      const day = this.padLeft(date.getDate().toString(), '0', 2);
      const hour = this.padLeft(date.getHours().toString(), '0', 2);
      const minutes = this.padLeft(date.getMinutes().toString(), '0', 2);
      const formattedDate = year + month + day + "_" + hour + minutes;

      var options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true,
          showTitle: false,
          useBom: true
      };

      var mapData = [];
      mapData.push(this.ReporterHeader());
      this.reporterData.map(d => mapData.push(this.ReporterData(d)));
      var fileName = 'Reporters_' + this.hostName + '_' + formattedDate;
      new Angular2Csv(mapData, fileName, options);
  }

  private ReporterData(data: any): any {
      return {
          id: data._id,
          fname: data.fname,
          lname: data.lname,
          chatName: data.chatName,
          isVolunteer: data.isVolunteer,
          team: data.activeTeamName,
          host: data.hostName,
          status1: data.status1,
          status2: data.status2,
      };
  }

  private ReporterHeader(): any {
      return {
          id: "Id",
          fname: "First Name",
          lname: "Last Name",
          chatName: "Chat Name",
          isVolunteer: "Volunteer",
          team: "Team",
          host: "Host",
          status1: "Status 1",
          status2: "Status 2",
      };
  }

  private padLeft(text: string, padChar: string, size: number): string {
      return (String(padChar).repeat(size) + text).substr((size * -1), size);
  }
}
