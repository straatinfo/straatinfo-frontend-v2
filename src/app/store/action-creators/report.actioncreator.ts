import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import swal from 'sweetalert2';
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
import { ReportService, DialogService, CategoryService } from '../../services';
import { IReport } from '../../interface/report/report.interface';
import { IReportView } from '../../interface/report/report-view.interface';
import { IMainCategory } from '../../interface/category/main-category.interface';
import { ISubCategory } from '../../interface/category/sub-category.interface';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()

export class ReportActionCreator implements OnDestroy {

	private errorMessage: string;
	private getLatestReportSubscription: Subscription = null;
	private updateReportSubscription: Subscription = null;
	private deleteReportSubscription: Subscription = null;
	private getReportByIdSubscription: Subscription = null;
	private getOneReportSubscription: Subscription = null;
    private categorySubscription: Subscription = null;

	constructor(
		private ngRedux: NgRedux<IAppState>,
		private reportService: ReportService,
        private dialogService: DialogService,
        private categoryService: CategoryService
	) { }

	ngOnDestroy() {
		(this.getLatestReportSubscription) ? this.getLatestReportSubscription.unsubscribe() : null;
		(this.updateReportSubscription) ? this.updateReportSubscription.unsubscribe() : null;
		(this.deleteReportSubscription) ? this.deleteReportSubscription.unsubscribe() : null;
		(this.getReportByIdSubscription) ? this.getReportByIdSubscription.unsubscribe() : null;
        (this.getOneReportSubscription) ? this.getOneReportSubscription.unsubscribe() : null;
        (this.categorySubscription) ? this.categorySubscription.unsubscribe() : null;
	}

	GetLatestReport() {
		this.ngRedux.dispatch({ type: REPORT_GET_ATTEMPT });
		this.getLatestReportSubscription = this.reportService.GetLatestReport()
			.map(data => {
				return data.map(d => this.ReportToView(d))
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
        const hostId = _hostId;  
		this.ngRedux.dispatch({ type: REPORT_GET_ATTEMPT });
		this.getLatestReportSubscription = this.reportService.GetLatestReportByHost(_hostId)
			.map(data => {
				return data.map(d => this.ReportToView(d))
			})
			.subscribe(
            (reports: IReportView[]) => {
                console.log(reports)
                this.categoryService.GetHostMainCategory(hostId).subscribe(
                    (category: IMainCategory[]) => {
                        reports = this.mainCategoryListTranslate(reports, category); 

                        this.categoryService.GetGeneralMainCategory('A').subscribe(
                        (category: IMainCategory[]) => {
                            reports = this.mainCategoryListTranslate(reports, category); 

                            this.categoryService.GetGeneralMainCategory('B').subscribe(
                            (category: IMainCategory[]) => {
                                reports = this.mainCategoryListTranslate(reports, category);

                                this.categoryService.GetGeneralMainCategory('C').subscribe(
                                (category: IMainCategory[]) => {
                                    reports = this.mainCategoryListTranslate(reports, category);

                                    this.ngRedux.dispatch({ type: REPORT_GET_FULFILLED, payload: reports });
                                });
                            });
                        });
                    });

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

	UpdateReport(_id: string, note: string, status: string, causeOfFinished: string, flat: boolean = true) {
		this.ngRedux.dispatch({ type: REPORT_UPDATE_ATTEMPT });
		this.updateReportSubscription = this.reportService.UpdateReport(_id, note, status, causeOfFinished, flat)
			.subscribe(
				(report: IReport) => {
					swal('Update Success', `Report: ${report.generatedReportId} was updated to ${report.status}`, 'success')
					.then(() => {
						this.ngRedux.dispatch({ type: REPORT_UPDATE_FULFILLED, payload: report });
						this.ngRedux.dispatch({ type: REPORT_SELECT_FULFILLED, payload: report });
						window.location.reload();
					});
				}, err => {
					this.errorMessage = err._body;
					if (this.errorMessage && typeof this.errorMessage === 'string') {
						const errorData = JSON.parse(this.errorMessage) ? JSON.parse(this.errorMessage) : {
							status: 0,
							error: 'SERVER_ERROR',
							message: 'Internal Server Error',
							statusCode: 500
						};
						this.ngRedux.dispatch({ type: REPORT_UPDATE_FAILED, error: errorData.message });
						this.dialogService.showSwal('error-message', { title: 'Update Error', text: errorData.message });
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
                    this.categoryService.GetHostMainCategory(report._host).subscribe(
                        (category: IMainCategory[]) => {

                        report = this.mainCategoryViewTranslate(report, category);                            

                        this.categoryService.GetGeneralMainCategory('A').subscribe(
                        (category: IMainCategory[]) => {
                            report = this.mainCategoryViewTranslate(report, category);

                            this.categoryService.GetGeneralMainCategory('B').subscribe(
                            (category: IMainCategory[]) => {
                                report = this.mainCategoryViewTranslate(report, category);

                                this.categoryService.GetGeneralMainCategory('C').subscribe(
                                (category: IMainCategory[]) => {
                                    report = this.mainCategoryViewTranslate(report, category);

                                    this.categoryService.GetSubCategory(report._mainCategory).subscribe(
                                    (subcategory: ISubCategory[]) => {
                                        report = this.subCategoryViewTranslate(report, subcategory);

                                        this.ngRedux.dispatch({ type: REPORT_SELECT_FULFILLED, payload: report });
                                    });                                    
                                });
                            });
                        });                                          
                    });
                    					
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

	ResetSelectedReport() {
		this.ngRedux.dispatch({ type: REPORT_SELECT_FULFILLED, payload: null });
	}

	// private ReportListToView(data: IReport): IReportView {
	// 	const report: IReportView = {
	// 		_id: data._id,
	// 		generatedReportId: data.generatedReportId,
	// 		hostName: data['_host.hostName'],
	// 		title: data.title,
	// 		description: data.description,
	// 		location: data.location,
	// 		long: data.long,
	// 		lat: data.lat,
	// 		note: data.note,
	// 		status: data.status,
	// 		isVehicleInvolved: data.isVehicleInvolved,
	// 		isPeopleInvolved: data.isPeopleInvolved,
	// 		vehicleInvolvedDescription: data.vehicleInvolvedDescription,
	// 		peopleInvolvedCount: data.peopleInvolvedCount,
	// 		reportTypeCode: data['_reportType.code'],
	// 		mainCategoryName: data['_mainCategory.name'],
	// 		subCategoryName: data['_subCategory.name'],
	// 		reporterName: (data['_reporter.lname'] && data['_reporter.fname']) ? data['_reporter.fname'] + ' ' + data['_reporter.lname'] : '',
	// 		teamName: data['_team.teamName'],
	// 		causeOfFinished: data.causeOfFinished,
	// 		createdAt: data.createdAt,
	// 		updatedAt: data.updatedAt,
	// 		finishedDate: this.formatFinishedDate(data)
	// 	};
	// 	return report;
	// }

    private ReportToView(data: IReport): IReportView {

		const report: IReportView = {
			_id: data._id,
			generatedReportId: data.generatedReportId,
			title: data.title,
			description: data.description,
			location: data.location,
			long: data.long,
			lat: data.lat,
			note: data.note,
			status: data.status,
			isVehicleInvolved: data.isVehicleInvolved,
			isPeopleInvolved: data.isPeopleInvolved,
			vehicleInvolvedCount: data.vehicleInvolvedCount,
			vehicleInvolvedDescription: data.vehicleInvolvedDescription,
			peopleInvolvedCount: data.peopleInvolvedCount,
			peopleInvolvedDescription: data.peopleInvolvedDescription,
			_reportType: data['_reportType._id'],
			_reportTypeCode: data['_reportType.code'],
			_mainCategory: data['_mainCategory._id'],
			_mainCategoryName: data['_mainCategory.name'],
			_subCategory: data['_subCategory._id'],
			_subCategoryName: data['_subCategory.name'],
			_reporter: data['_reporter._id'],
			_reporterName: (data['_reporter.lname'] && data['._reporter.fname']) ? data['_reporter.fname'] + ' ' + data['_reporter.lname ']: '',
			_reporterUsername: data['_reporter.username'],
			_team: data['_team._id'],
			_teamName: data['_team.teamName'],
			_host: data['_host._id'],
			_hostName: data['_host.hostName'],
			_hostEmail: data['_host.email'],
			causeOfFinished: data.causeOfFinished,
			dateReported: this.formatDate(data.createdAt),
			createdAt: data.createdAt,
			updatedAt: data.updatedAt,
			finishedDate: (data.finishedDate) ? moment(data.finishedDate).format('YYYY/MM/DD') : '',
			language: data.language
		};
		return report;
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

	// private formatFinishedDate(data: IReport): string {

	// 	const date = new Date(data.finishedDate);
	// 	const year = date.getFullYear().toString();
	// 	const month = this.padLeft((date.getMonth() + 1).toString(), '0', 2);
	// 	const day = this.padLeft(date.getDate().toString(), '0', 2);
	// 	const hour = this.padLeft(date.getHours().toString(), '0', 2);
	// 	const minutes = this.padLeft(date.getMinutes().toString(), '0', 2);
	// 	const formattedDate = year + "/" + month + "/" + day + " " + hour + ":" + minutes;

	// 	if (data.finishedDate == null)
	// 		return "";

	// 	return formattedDate;
	// }

	private padLeft(text: string, padChar: string, size: number): string {
		return (String(padChar).repeat(size) + text).substr((size * -1), size);
    }

    private mainCategoryViewTranslate(report: IReportView, category: IMainCategory[]): IReportView {
        _.map(category, function (x) {
            if (report._mainCategory == x._id) {
                _.map(x.translations, function (y) {
                    if (y.code == report.language) {
                        report._mainCategoryName = y.word
                    }
                });
            }
        });

        return report;
    }

    private subCategoryViewTranslate(report: IReportView, subcategory: ISubCategory[]): IReportView {
        _.map(subcategory, function (x) {
            if (report._subCategory == x._id) {
                _.map(x.translations, function (y) {
                    if (y.code == report.language) {
                        report._subCategoryName = y.word
                    }
                });
            }
        });

        return report;
    }

    private mainCategoryListTranslate(reports: IReportView[], category: IMainCategory[]): IReportView[] {
        _.map(reports, function (report) {
            _.map(category, function (x) {
                if (report._mainCategory == x._id) {
                    _.map(x.translations, function (y) {
                        if (y.code == report.language) {
                            report._mainCategoryName = y.word
                        }
                    });
                }
            });
        });

        return reports;
    }
}
