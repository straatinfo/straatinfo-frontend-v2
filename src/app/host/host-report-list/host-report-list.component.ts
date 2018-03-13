import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ReportActionCreator } from '../../store/action-creators';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-host-report-list',
  templateUrl: './host-report-list.component.html',
  styleUrls: ['./host-report-list.component.scss']
})
export class HostReportListComponent implements OnInit {

  private routeParamsSubscription: Subscription = null;
  private hostSubscription: Subscription = null;
  private reportSubscription: Subscription = null;

  @select(s => s.report.reports) reports;
  @select(s => s.report.spinner) reportSpinner;
  @select(s => s.table.page) page;
  @select(s => s.host.selectedHost) selectedHost;

  public hostName: string;
  public hostId: string;
  public reportData = [];

  public dataNames: string[] = [
      'generatedReportId', 'date', 'mainCategoryName', 'subCategoryName', 'reporterName', 'teamName', 'finishedDate', 'causeOfFinished', 'reportTypeCode'
  ];

  public dataAliases: string[] = [
      'ID', 'Date', 'Main Category', 'Sub Category', 'Chat Name', 'Team', 'Finished Date', 'Cause of Finishing', 'Report Type'
  ];

  constructor(
      private actvatedRoute: ActivatedRoute,
      private reportActionCreator: ReportActionCreator,
      private router: Router
  ) {
  }

  ngOnInit() {
      this.routeParamsSubscription = this.actvatedRoute.params
        .subscribe(
          params => {
                this.hostId = params._hostId;
                this.reportActionCreator.GetLatestReportByHost(params._hostId);
        });

      this.hostSubscription = this.selectedHost
        .subscribe(host => {  
            this.hostName = (host) ? host.hostName: null;                  
        });

      this.reportSubscription = this.reports
        .subscribe(report => {
            this.reportData = report;
        });
  }

  onBack() {
      this.router.navigate([`admin/host/${this.hostId}`]);
  }

  onMoreClick(event) {
      this.reportActionCreator.SelectReport(event._id);
      this.router.navigate([`admin/report/${event._id}`]);
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
      mapData.push(this.ReportHeader());
      this.reportData.map(d => mapData.push(this.ReportData(d)));
      var fileName = 'Reports_' + this.hostName + '_' + formattedDate;
      new Angular2Csv(mapData, fileName, options);
  }

  private ReportData(data: any): any {
      return {
          id: data._id,
          generatedReportId: data.generatedReportId,
          date: data.date,
          title: data.title,
          description: data.description,
          location: data.location,
          lat: data.lat,
          long: data.long,
          status: data.status,
          isPeopleInvolved: data.isPeopleInvolved,
          peopleInvolvedCount: data.peopleInvolvedCount,
          isVehicleInvolved: data.isVehicleInvolved,
          vehicleInvolvedDescription: data.vehicleInvolvedDescription,
          note: data.note,
          host: data.hostName,
          mainCategory: data.mainCategoryName,
          subCategory: data.subCategoryName,
          reporter: data.reporterName,
          reportType: data.reportTypeCode,
          team: data.teamName,
          finishedDate: data.finishedDate,
          causeOfFinished: data.causeOfFinished,
          createdAt: data.createdAt
      };
  }

  private ReportHeader(): any {
      return {
          id: "Id",
          generatedReportId: "Generated Report Id",
          date: "Date",
          title: "Title",
          description: "Description",
          location: "Location",
          lat: "Latitude",
          long: "Longtitude",
          status: "Status",
          isPeopleInvolved: "Is People Involved",
          peopleInvolvedCount: "People Involved Count",
          isVehicleInvolved: "Is Vehicle Involved",
          vehicleInvolvedDescription: "Vehicle Involved Description",
          note: "Note",
          host: "Host",
          mainCategory: "Main Category",
          subCategory: "Sub Category",
          reporter: "Reporter",
          reportType: "Report Type",
          team: "Team",
          finishedDate: "Finished Date",
          causeOfFinished: "Cause Of Finished",
          createdAt: "CreatedAt",
      };
  }

  private padLeft(text: string, padChar: string, size: number): string {
        return (String(padChar).repeat(size) + text).substr((size * -1), size);
  }
}
