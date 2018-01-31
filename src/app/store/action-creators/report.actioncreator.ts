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
import { IReport } from 'app/interface/report/report.interface';


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
    .subscribe(
      (reports: IReport[]) => {
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
}
