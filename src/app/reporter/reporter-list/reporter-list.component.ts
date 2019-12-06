import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ReporterActionCreator } from '../../store/action-creators';
import { IReporterView } from '../../interface/reporter/reporter-view.interface';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-style';

@Component({
  selector: 'app-report-list',
  templateUrl: './reporter-list.component.html',
  styleUrls: ['./reporter-list.component.scss']
})
export class ReporterListComponent implements OnInit {

  private EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private EXCEL_EXTENSION = '.xlsx';

  private reporterSubscription: Subscription = null;

  @select(s => s.reporter.reporters) reporters;
  @select(s => s.reporter.spinner) reporterSpinner;
  @select(s => s.table.page) page;

  public reporterData = [];

  public dataNames: string[] = [
      'fname', 'lname', 'chatName', 'isVolunteer', 'activeTeamName', 'hostName', 'status1', 'status2'
  ];

  public dataAliases: string[] = [
      'First Name', 'Last Name', 'Chat Name', 'Volunteer', 'Team', 'Host', 'S1', 'S2'
  ];

  constructor(
      private reporterActionCreator: ReporterActionCreator,
      private router: Router
  ) {
    this.reporterActionCreator.GetLatestReporter();
  }

  ngOnInit() {
      this.reporterActionCreator.GetLatestReporter();

      this.reporterSubscription = this.reporters
          .subscribe(reporter => {
              this.reporterData = reporter;
          });
  }

  onMoreClick(event) {
      this.reporterActionCreator.SelectReporter(event._id);
      this.router.navigate([`admin/reporter/${event._id}`]);
  }
  onClickChatName(event) {
    this.reporterActionCreator.SelectReporter(event._id);
    this.router.navigate([`admin/reporter/${event._id}`]);
  }

  onDownload() {
      const mapData = [];
      this.reporterData.map(d => mapData.push(this.ReporterData(d)));
      const fileName = 'Reporters';
      this.ExportAsExcelFile(mapData, fileName);
  }

  private ReporterData(data: IReporterView): any {
  console.log(data)
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
          houseNumber: data.houseNumber || '',
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
