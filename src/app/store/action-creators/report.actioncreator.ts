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
import { ReportService } from '../../services';
import { IReport } from '../../interface/report/report.interface';
import { IReportView } from '../../interface/report/report-view.interface';


@Injectable()

export class ReportActionCreator implements OnDestroy {

  private errorMessage: string;
  private getLatestReportSubscription: Subscription = null;
  private updateReportSubscription: Subscription = null;
  private deleteReportSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private reportService: ReportService
  ) {}

  ngOnDestroy() {
    (this.getLatestReportSubscription) ? this.getLatestReportSubscription.unsubscribe() : null;
    (this.updateReportSubscription) ? this.updateReportSubscription.unsubscribe() : null;
    (this.deleteReportSubscription) ? this.deleteReportSubscription.unsubscribe() : null;
  }

  GetLatestReport() {
    this.ngRedux.dispatch({ type: REPORT_GET_ATTEMPT });
    this.getLatestReportSubscription = this.reportService.GetLatestReport()
    .map(data => {
      return data.map(d => this.ReportToView(d))
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

  GetLatestReportByHost(hostId: number) {
      this.ngRedux.dispatch({ type: REPORT_GET_ATTEMPT });
      this.getLatestReportSubscription = this.reportService.GetLatestReportByHost(hostId)
          .map(data => {
              return data.map(d => this.ReportToView(d))
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

  UpdateReport(id: number, note: string, status: string) {
    this.ngRedux.dispatch({ type: REPORT_UPDATE_ATTEMPT });
    this.updateReportSubscription = this.reportService.UpdateReport(id, note, status)
    .subscribe(
      (report: IReport) => {
        this.ngRedux.dispatch({ type: REPORT_UPDATE_FULFILLED, payload: report });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: REPORT_UPDATE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteReport(id: number, report: IReport) {
    this.ngRedux.dispatch({ type: REPORT_DELETE_ATTEMPT });
    this.deleteReportSubscription = this.reportService.DeleteReport(id)
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

  SelectReport (id: number) {
    this.ngRedux.dispatch({ type: REPORT_SELECT_FULFILLED, payload: id });
  }

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
      vehicleInvolvedDescription: data.vehicleInvolvedDescription,
      peopleInvolvedCount: data.peopleInvolvedCount,
      _reportType: data._reportType.code,
      _mainCategory: data._mainCategory.name,
      _subCategory: data._subCategory.name,
      _reporter: data._reporter.fname + ' ' + data._reporter.lname,
      _host: data._host.hostName,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
    return report;
  }

  private formatDate (data: IReportView): IReportView {
    const date = new Date(data.createdAt);
    const formattedDate = date.getFullYear() + '-' + (date.getMonth() +1) + '-' + date.getDate();
    return {
      ...data,
      date: formattedDate
    };
  }

}
