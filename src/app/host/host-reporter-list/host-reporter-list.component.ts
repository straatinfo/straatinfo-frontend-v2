import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ReporterActionCreator, HostActionCreator } from '../../store/action-creators';
// import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-style';

@Component({
  selector: 'app-host-report-list',
  templateUrl: './host-reporter-list.component.html',
  styleUrls: ['./host-reporter-list.component.scss']
})
export class HostReporterListComponent implements OnInit, DoCheck {

  private EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private EXCEL_EXTENSION = '.xlsx';

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
      'fname', 'lname', 'chatName', 'isVolunteer', 'activeTeamName', 'status1', 'status2'
  ];

  public dataAliases: string[] = [
      'First Name', 'Last Name', 'Chat Name', 'Volunteer', 'Team', 'S1', 'S2'
  ];

  constructor(
      private actvatedRoute: ActivatedRoute,
      private reporterActionCreator: ReporterActionCreator,
      private router: Router,
      private hostActionCreator: HostActionCreator
  ) {
  }

  ngOnInit() {
    this.routeParamsSubscription = this.actvatedRoute.params
    .subscribe(
        params => {
            this.hostId = params._hostId;
            this.reporterActionCreator.GetLatestReporterByHost(params._hostId);
            this.hostActionCreator.SelectHost(params._hostId);
        }
      );

    this.hostSubscription = this.selectedHost
        .subscribe(host => {
            this.hostName = (host) ? host.hostName : null;
        });

    this.reporterSubscription = this.reporters
        .subscribe(reporter => {
            this.reporterData = reporter;
        });
  }

  ngDoCheck () {
    this.hostSubscription = this.selectedHost
    .subscribe(host => {
        this.hostName = (host) ? host.hostName : null;
    });
  }

  onBack() {
      this.router.navigate([`admin/host/${this.hostId}`]);
  }

  onClickMore(event) {
      this.router.navigate([`admin/host/reporter/details/${this.hostId}/${event._id}`]);
  }
  onClickChatName(event) {
    this.router.navigate([`admin/host/reporter/details/${this.hostId}/${event._id}`]);
    // this.router.navigate([`${this.session.user._role.code.toLowerCase()}/reporter/${_reporter}`]);
}

  onDownload() {
      var mapData = [];
      this.reporterData.map(d => mapData.push(this.ReporterData(d)));
      var fileName = 'Host_Reporters';
      this.ExportAsExcelFile(mapData, fileName);
  }

  private ReporterData(data: any): any {
      return {
          id: data._id || '',
          fname: data.fname || '',
          lname: data.lname,
          chatName: data.chatName || '',
          isVolunteer: data.isVolunteer || '',
          activeTeamName: data.activeTeamName || '',         
          team: data.activeTeamName || '',
          host: data.hostName || '',
          email: data.email || '',
          gender: data.gender || '',
          phoneNumber: data.phoneNumber || '',
          postalCode: data.postalCode || '',
          streetName: data.streetName || '',
          city: data.city || '',
          dateRegistrationReporter: data.dateRegistrationReporter || '',
          dateCreationTeam: data.dateCreationTeam || '',
          status1: data.status1 || '',
          status2: data.status2 || ''
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

  private ExportAsExcelFile(json: any[], excelFileName: string): void {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      this.WrapAndCenterCell(worksheet.B2);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      // Use XLSXStyle instead of XLSX write function which property writes cell styles.
      const excelBuffer: any = XLSXStyle.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      this.SaveAsExcelFile(excelBuffer, excelFileName);
  }

  private WrapAndCenterCell(cell: XLSX.CellObject) {
      const wrapAndCenterCellStyle = { alignment: { wrapText: true, vertical: 'center', horizontal: 'center' } };
      this.SetCellStyle(cell, wrapAndCenterCellStyle);
  }

  private SetCellStyle(cell: XLSX.CellObject, style: {}) {
      cell.s = style;
  }

  private SaveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {
          type: this.EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
  }

  private formatDate(data: Date): string {

      const date = new Date(data);
      const year = date.getFullYear().toString();
      const month = this.padLeft((date.getMonth() + 1).toString(), '0', 2);
      const day = this.padLeft(date.getDate().toString(), '0', 2);
      const hour = this.padLeft(date.getHours().toString(), '0', 2);
      const minutes = this.padLeft(date.getMinutes().toString(), '0', 2);
      const formattedDate = year + "/" + month + "/" + day + " " + hour + ":" + minutes;

      if (data == null)
          return "";

      return formattedDate;
  }
}
