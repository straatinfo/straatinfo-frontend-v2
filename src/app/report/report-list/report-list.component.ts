import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ReportActionCreator } from '../../store/action-creators';
import { ISession } from 'app/interface/session/session.interface';
import { IRole } from 'app/interface/role/role.interface';
import { IHost } from 'app/interface/host/host.interface';
import { IReportView } from '../../interface/report/report-view.interface';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-style';

@Component({
	selector: 'app-report-list',
	templateUrl: './report-list.component.html',
	styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

    public reportList = 'report.list.reportList';

    private EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    private EXCEL_EXTENSION = '.xlsx';

	private reportSubscription: Subscription = null;

	@select(s => s.report.reports) reports;
	@select(s => s.report.spinner) reportSpinner;
	@select(s => s.table.page) page;

	public session: ISession = JSON.parse(localStorage.getItem('session'));
	public _role: IRole = this.session.user._role;
    public _host: IHost = this.session.user;
    public _language = this.session.user.language.toUpperCase();
	public reportData = [];

    public dataNames: string[] = (this._role.code.toUpperCase() === 'ADMIN') ?
		['generatedReportId', 'dateReported', '_mainCategoryName', 'status', '_teamName'] :
		['generatedReportId', 'dateReported', '_mainCategoryName', 'status'];

    public dataAliases: string[] = (this._role.code.toUpperCase() === 'ADMIN') ?
        ['table.reportNumber', 'table.date', 'table.mainCategory', 'table.status', 'table.team'] :
        ['table.reportNumber', 'table.date', 'table.mainCategory', 'table.status']

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
		this.reportSubscription = this.reports
			.subscribe(report => {
				this.reportData = report;
			});
	}

	onMoreClick(event) {
		this.reportActionCreator.ResetSelectedReport();
		if (this._role.code.toLocaleUpperCase() === 'ADMIN') {
			this.router.navigate([`admin/report/${event._id}`]);
		} else {
			this.router.navigate([`host/report/${event._id}`]);
		}
	}

	onDownload() {
        var mapData = [];
        this.reportData.map(d => mapData.push(this.ReportData(d)));
        var fileName = 'Reports';
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
			host: data._host || '',
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
