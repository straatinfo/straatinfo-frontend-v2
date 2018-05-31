import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ReportActionCreator, HostActionCreator } from '../../store/action-creators';
import { IReportView } from '../../interface/report/report-view.interface';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-style';

@Component({
  selector: 'app-host-report-list',
  templateUrl: './host-report-list.component.html',
  styleUrls: ['./host-report-list.component.scss']
})
export class HostReportListComponent implements OnInit {

  private EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private EXCEL_EXTENSION = '.xlsx';

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
      'generatedReportId', 'date', '_mainCategoryName',
      '_subCategoryName', '_reporterUsername', '_teamName',
      'finishedDate', 'causeOfFinished', '_reportTypeCode'
  ];

  public dataAliases: string[] = [
      'ID', 'Date', 'Main Category',
      'Sub Category', 'Chat Name', 'Team',
      'Finished Date', 'Cause of Finishing', 'Report Type'
  ];

  constructor(
      private actvatedRoute: ActivatedRoute,
      private reportActionCreator: ReportActionCreator,
      private router: Router,
      private hostActionCreator: HostActionCreator
  ) {
  }

  ngOnInit() {
      this.routeParamsSubscription = this.actvatedRoute.params
        .subscribe(
          params => {
                this.hostId = params._hostId;
                this.reportActionCreator.GetLatestReportByHost(params._hostId);
                this.hostActionCreator.SelectHost(params._hostId);
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
      var mapData = [];
      this.reportData.map(d => mapData.push(this.ReportData(d)));
      var fileName = 'Host_Reports';
      this.ExportAsExcelFile(mapData, fileName);
  }

  private ReportData(data: IReportView): any {
      return {
          generatedReportId: data.generatedReportId || '',
          date: data.date || '',
          title: data.title || '',
          description: data.description || '',
          location: data.location || '',
          lat: data.lat || '',
          long: data.long || '',
          status: data.status || '',
          isPeopleInvolved: data.isPeopleInvolved || '',
          peopleInvolvedCount: data.peopleInvolvedCount || '',
          isVehicleInvolved: data.isVehicleInvolved || '',
          vehicleInvolvedDescription: data.vehicleInvolvedDescription || '',
          note: data.note || '',
          host: data._hostName || '',
          mainCategory: data._mainCategoryName || '',
          subCategory: data._subCategoryName || '',
          reporter: data._reporterName || '',
          reportType: data._reportTypeCode || '',
          team: data._teamName || '',
          finishedDate: data.finishedDate || '',
          causeOfFinished: data.causeOfFinished || '',
          createdAt: data.createdAt || ''
      };
  }

  private ReportHeader(): any {
      return {
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

  onClickMore(data) {
      this.router.navigate([`admin/host/report/details/${this.hostId}/${data._id}`]);
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
}
