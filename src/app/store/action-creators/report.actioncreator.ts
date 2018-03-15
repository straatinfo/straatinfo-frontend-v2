import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../app.store';
import {
REPORT_CREATE_ATTEMPT,
REPORT_CREATE_FAILED,
REPORT_CREATE_FULFILLED,
REPORT_DELETE_ATTEMPT,
REPORT_DELETE_FAILED,
REPORT_DELETE_FULFILLED,
REPORT_GET_ATTEMPT,
REPORT_GET_FAILED,
REPORT_GET_FULFILLED,
REPORT_SELECT_ATTEMPT,
REPORT_SELECT_FAILED,
REPORT_SELECT_FULFILLED,
REPORT_UPDATE_ATTEMPT,
REPORT_UPDATE_FAILED,
REPORT_UPDATE_FULFILLED
} from '../actions/report.action';
import { Subscription } from 'rxjs/Subscription';
import { ReportService, DialogService } from '../../services';
import { IReport } from '../../interface/report/report.interface';
import { IReportView } from '../../interface/report/report-view.interface';


@Injectable()

export class ReportActionCreator implements OnDestroy {

    private errorMessage: string;
    private getLatestReportSubscription: Subscription = null;
    private updateReportSubscription: Subscription = null;
    private deleteReportSubscription: Subscription = null;
    private getReportByIdSubscription: Subscription = null;
    private getOneReportSubscription: Subscription = null;

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private reportService: ReportService,
        private dialogService: DialogService
    ) { }

    ngOnDestroy() {
        (this.getLatestReportSubscription) ? this.getLatestReportSubscription.unsubscribe() : null;
        (this.updateReportSubscription) ? this.updateReportSubscription.unsubscribe() : null;
        (this.deleteReportSubscription) ? this.deleteReportSubscription.unsubscribe() : null;
        (this.getReportByIdSubscription) ? this.getReportByIdSubscription.unsubscribe() : null;
        (this.getOneReportSubscription) ? this.getOneReportSubscription.unsubscribe() : null;
    }

    GetLatestReport() {
        this.ngRedux.dispatch({ type: REPORT_GET_ATTEMPT });
        this.getLatestReportSubscription = this.reportService.GetLatestReport()
            .map(data => {
                return data.map(d => this.ReportListToView(d))
            })
            .map(data => {
                return data.map(d => this.formatDate(d))
            })
            .subscribe(
            (reports: IReportView[]) => {
                this.ngRedux.dispatch({ type: REPORT_GET_FULFILLED, payload: reports });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORT_GET_FAILED, error: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }

    GetLatestReportByHost(_hostId: string) {
        this.ngRedux.dispatch({ type: REPORT_GET_ATTEMPT });
        this.getLatestReportSubscription = this.reportService.GetLatestReportByHost(_hostId)
            .map(data => {
                return data.map(d => this.ReportListToView(d))
            })
            .map(data => {
                return data.map(d => this.formatDate(d))
            })
            .subscribe(
            (reports: IReportView[]) => {
                this.ngRedux.dispatch({ type: REPORT_GET_FULFILLED, payload: reports });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORT_GET_FAILED, error: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }

    UpdateReport(_id: string, note: string, status: string) {
        this.ngRedux.dispatch({ type: REPORT_UPDATE_ATTEMPT });
        this.updateReportSubscription = this.reportService.UpdateReport(_id, note, status)
            .subscribe(
            (report: IReport) => {
                this.ngRedux.dispatch({ type: REPORT_UPDATE_FULFILLED, payload: report });
                this.dialogService.showSwal('success-message', { title: 'Update Success', text: `Report: ${report.generatedReportId} was updated to ${report.status}` });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORT_UPDATE_FAILED, error: this.errorMessage });
                    this.dialogService.showSwal('error-message', { title: 'Update Error', text: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }

    DeleteReport(_id: string, report: IReport) {
        this.ngRedux.dispatch({ type: REPORT_DELETE_ATTEMPT });
        this.deleteReportSubscription = this.reportService.DeleteReport(_id)
            .subscribe(
            data => {
                this.ngRedux.dispatch({ type: REPORT_DELETE_FULFILLED, payload: report });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORT_DELETE_FAILED, error: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }

    GetReportById(_id: string) {
        this.ngRedux.dispatch({ type: REPORT_SELECT_ATTEMPT });
        this.getReportByIdSubscription = this.reportService.GetReportById(_id)
            .map(data => this.ReportToView(data))
            .subscribe(
            (report: IReportView) => {
                this.ngRedux.dispatch({ type: REPORT_SELECT_FULFILLED, payload: report });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORT_GET_FAILED, error: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }

    SelectReport(_id: string) {
        this.ngRedux.dispatch({ type: REPORT_SELECT_ATTEMPT });
        this.getOneReportSubscription = this.reportService.GetReportById(_id)
            .map(data => this.ReportToView(data))
            .subscribe(
            (report: IReportView) => {
                this.ngRedux.dispatch({ type: REPORT_SELECT_FULFILLED, payload: report });
            }, err => {
                this.errorMessage = err._body;
                if (this.errorMessage && typeof this.errorMessage === 'string') {
                    this.ngRedux.dispatch({ type: REPORT_SELECT_FAILED, error: this.errorMessage });
                }
            },
            () => {
                this.errorMessage = null;
            }
            );
    }

    private ReportListToView(data: IReport): IReportView {
        const report: IReportView = {
            _id: data._id,
            generatedReportId: data.generatedReportId,
            hostName: data['_host.hostName'],
            title: data.title,
            description: data.description,
            location: data.location,
            long: data.long,
            lat: data.lat,
            note: data.note,
            status: data.status,
            isVehicleInvolved: data.isVehicleInvolved,
            isPeopleInvolved: data.isPeopleInvolved,
            vehicleInvolvedDescription: data.vehicleInvolvedDescription,
            peopleInvolvedCount: data.peopleInvolvedCount,
            reportTypeCode: data['_reportType.code'],
            mainCategoryName: data['_mainCategory.name'],
            subCategoryName: data['_subCategory.name'],
            reporterName: (data['_reporter.lname'] && data['_reporter.fname']) ? data['_reporter.fname'] + ' ' + data['_reporter.lname'] : '',
            teamName: data['_team.teamName'],
            causeOfFinished: data.causeOfFinished,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            finishedDate: this.formatFinishedDate(data)
        };
        return report;
    }

    private ReportToView(data: IReport): IReportView {
        const report: IReportView = {
            _id: data._id,
            generatedReportId: data.generatedReportId,
            hostName: data._host.hostName,
            title: data.title,
            description: data.description,
            location: data.location,
            long: data.long,
            lat: data.lat,
            note: data.note,
            status: data.status,
            isVehicleInvolved: data.isVehicleInvolved,
            isPeopleInvolved: data.isPeopleInvolved,
            vehicleInvolvedDescription: data.vehicleInvolvedDescription,
            peopleInvolvedCount: data.peopleInvolvedCount,
            reportTypeCode: data._reportType.code,
            mainCategoryName: data._mainCategory.name,
            subCategoryName: '',//data._subCategory.name,
            reporterName: (data._reporter.lname && data._reporter.fname) ? data._reporter.fname + ' ' + data._reporter.lname : '',
            teamName: data._team.teamName,
            causeOfFinished: data.causeOfFinished,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            finishedDate: this.formatFinishedDate(data)
        };
        return report;
    }

    private formatDate(data: IReportView): IReportView {
        const date = new Date(data.createdAt);
        const year = date.getFullYear().toString();
        const month = this.padLeft((date.getMonth() + 1).toString(), '0', 2);
        const day = this.padLeft(date.getDate().toString(), '0', 2);
        const hour = this.padLeft(date.getHours().toString(), '0', 2);
        const minutes = this.padLeft(date.getMinutes().toString(), '0', 2);
        const formattedDate = year + "/" + month + "/" + day + " " + hour + ":" + minutes;
        return {
      ...data,
            date: formattedDate
        };
    }

    private formatFinishedDate(data: IReport): string {

        const date = new Date(data.finishedDate);
        const year = date.getFullYear().toString();
        const month = this.padLeft((date.getMonth() + 1).toString(), '0', 2);
        const day = this.padLeft(date.getDate().toString(), '0', 2);
        const hour = this.padLeft(date.getHours().toString(), '0', 2);
        const minutes = this.padLeft(date.getMinutes().toString(), '0', 2);
        const formattedDate = year + "/" + month + "/" + day + " " + hour + ":" + minutes;

        if (data.finishedDate == null)
            return "";

        return formattedDate;
    }

    private padLeft(text: string, padChar: string, size: number): string {
        return (String(padChar).repeat(size) + text).substr((size * -1), size);
    }
}
