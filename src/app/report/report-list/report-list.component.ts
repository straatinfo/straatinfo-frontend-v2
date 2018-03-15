import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { ReportActionCreator } from '../../store/action-creators';
import { ISession } from 'app/interface/session/session.interface';
import { IRole } from 'app/interface/role/role.interface';
import { IHost } from 'app/interface/host/host.interface';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { IReportView } from '../../interface/report/report-view.interface';

@Component({
	selector: 'app-report-list',
	templateUrl: './report-list.component.html',
	styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

	private reportSubscription: Subscription = null;

	@select(s => s.report.reports) reports;
	@select(s => s.report.spinner) reportSpinner;
	@select(s => s.table.page) page;

	public session: ISession = JSON.parse(localStorage.getItem('session'));
	public _role: IRole = this.session.user._role;
	public _host: IHost = this.session.user;
	public reportData = [];

	public dataNames: string[] = (this._role.code.toUpperCase() === 'ADMIN') ? [
		'generatedReportId', 'date', '_mainCategoryName', '_reporterName', '_teamName'
	] : ['generatedReportId', 'date', '_mainCategoryName', 'status'];

	public dataAliases: string[] = (this._role.code.toUpperCase() === 'ADMIN') ? [
		'Report Number', 'Date', 'Main Category', 'Chat Name', 'Team'
	] : ['Melding Nummer', 'Datum', 'Hoofdcategorie', 'Status']

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
		var fileName = 'Reports_' + formattedDate;
		new Angular2Csv(mapData, fileName, options);
	}

	private ReportData(data: IReportView): any {
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
			host: data._host,
			mainCategory: data._mainCategoryName,
			subCategory: data._subCategoryName,
			reporter: data._reporterName,
			reportType: data._reportTypeCode,
			team: data._teamName,
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
