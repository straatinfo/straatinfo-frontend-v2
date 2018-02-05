import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../app.store';
import {
  REPORTER_CREATE_ATTEMPT,
  REPORTER_CREATE_FAILED,
  REPORTER_CREATE_FULFILLED,
  REPORTER_DELETE_ATTEMPT,
  REPORTER_DELETE_FAILED,
  REPORTER_DELETE_FULFILLED,
  REPORTER_GET_ATTEMPT,
  REPORTER_GET_FAILED,
  REPORTER_GET_FULFILLED,
  REPORTER_SELECT_ATTEMPT,
  REPORTER_SELECT_FAILED,
  REPORTER_SELECT_FULFILLED,
  REPORTER_UPDATE_ATTEMPT,
  REPORTER_UPDATE_FAILED,
  REPORTER_UPDATE_FULFILLED
} from '../actions/reporter.action';
import { Subscription } from 'rxjs/Subscription';
import { ReporterService } from '../../services';
import { IReporter } from '../../interface/reporter/reporter.interface';
import { IReporterView } from '../../interface/reporter/reporter-view.interface';


@Injectable()

export class ReporterActionCreator implements OnDestroy {

  private errorMessage: string;
  private getLatestReporterSubscription: Subscription = null;
  private updateReporterSubscription: Subscription = null;
  private deleteReporterSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private reporterService: ReporterService
  ) {}

  ngOnDestroy() {
    (this.getLatestReporterSubscription) ? this.getLatestReporterSubscription.unsubscribe() : null;
    (this.updateReporterSubscription) ? this.updateReporterSubscription.unsubscribe() : null;
    (this.deleteReporterSubscription) ? this.deleteReporterSubscription.unsubscribe() : null;
  }

  GetLatestReporter() {
      this.ngRedux.dispatch({ type: REPORTER_GET_ATTEMPT });
      this.getLatestReporterSubscription = this.reporterService.GetLatestReporter()
          .map(data => {
              return data.map(d => this.ReporterToView(d))
          })
          .subscribe(
          (reporters: IReporterView[]) => {
              this.ngRedux.dispatch({ type: REPORTER_GET_FULFILLED, payload: reporters });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: REPORTER_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  GetLatestReporterByHost(hostId: number) {
      this.ngRedux.dispatch({ type: REPORTER_GET_ATTEMPT });
      this.getLatestReporterSubscription = this.reporterService.GetLatestReporterByHost(hostId)
          .map(data => {
              return data.map(d => this.ReporterToView(d))
          })
          .subscribe(
          (reporters: IReporterView[]) => {
              this.ngRedux.dispatch({ type: REPORTER_GET_FULFILLED, payload: reporters });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: REPORTER_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  UpdateReporter(id: number) {
      this.ngRedux.dispatch({ type: REPORTER_UPDATE_ATTEMPT });
      this.updateReporterSubscription = this.reporterService.UpdateReporter(id)
          .subscribe(
          (reporter: IReporter) => {
              this.ngRedux.dispatch({ type: REPORTER_UPDATE_FULFILLED, payload: reporter });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: REPORTER_UPDATE_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  DeleteReporter(id: number, report: IReporter) {
      this.ngRedux.dispatch({ type: REPORTER_DELETE_ATTEMPT });
      this.deleteReporterSubscription = this.reporterService.DeleteReporter(id)
          .subscribe(
          data => {
              this.ngRedux.dispatch({ type: REPORTER_DELETE_FULFILLED, payload: report });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: REPORTER_DELETE_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  SelectReporter (id: number) {
    this.ngRedux.dispatch({ type: REPORTER_SELECT_FULFILLED, payload: id });
  }

  private ReporterToView(data: IReporter): IReporterView {
    const reporter: IReporterView = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        chatName: data.chatName,
        volunteer: data.volunteer,
        teamName: data.teamName,
        hostName: data.hostName,
        status1: data.status1,
        status2: data.status2,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt 
    };
    return reporter;
  }
}
