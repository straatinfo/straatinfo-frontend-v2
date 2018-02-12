import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { ReportTypeService } from '../../services';
import { IReportType } from '../../interface/report/report-type.interface';

import { 
  REPORTTYPE_CREATE_ATTEMPT,
  REPORTTYPE_CREATE_FAILED,
  REPORTTYPE_CREATE_FULFILLED,
  REPORTTYPE_DELETE_ATTEMPT,
  REPORTTYPE_DELETE_FAILED,
  REPORTTYPE_DELETE_FULFILLED,
  REPORTTYPE_GET_ATTEMPT,
  REPORTTYPE_GET_FAILED,
  REPORTTYPE_GET_FULFILLED,
  REPORTTYPE_UPDATE_ATTEMPT,
  REPORTTYPE_UPDATE_FAILED,
  REPORTTYPE_UPDATE_FULFILLED,
  REPORTTYPE_SELECT_FULFILLED,
  REPORTTYPE_SELECT_FAILED,
  REPORTTYPE_SELECT_ATTEMPT
} from '../actions/reportType.action';

@Injectable()

export class ReportTypeActionCreator implements OnDestroy {

  private errorMessage: string;
  private getReportTypeSubscription: Subscription = null;
  private updateReportTypeSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private reportTypeService: ReportTypeService
  ) {}

  ngOnDestroy () {
      (this.getReportTypeSubscription) ? this.getReportTypeSubscription.unsubscribe() : null;
      (this.updateReportTypeSubscription) ? this.updateReportTypeSubscription.unsubscribe() : null;
  }

  GetReportType() {
      this.ngRedux.dispatch({ type: REPORTTYPE_GET_ATTEMPT });
      this.getReportTypeSubscription = this.reportTypeService.GetReportType()
          .map((data: any[]) => { return data.map(d => this.ToReportTypeView(d)); })
          .subscribe(
          (reportType: IReportType[]) => {
              this.ngRedux.dispatch({ type: REPORTTYPE_GET_FULFILLED, payload: reportType });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: REPORTTYPE_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  UpdateReportType(_id: string, reportType: IReportType) {
      this.ngRedux.dispatch({ type: REPORTTYPE_UPDATE_ATTEMPT });
      this.updateReportTypeSubscription = this.reportTypeService.UpdateReportType(_id, reportType)
          .map(data => this.ToReportTypeView(data))
          .subscribe(
          (reportType: IReportType) => {
              this.ngRedux.dispatch({ type: REPORTTYPE_UPDATE_FULFILLED, payload: reportType });
              this.ngRedux.dispatch({ type: REPORTTYPE_SELECT_FULFILLED, payload: reportType._id });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: REPORTTYPE_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  private ToReportTypeView(data: any): IReportType {
      return {
          _id: data._id,
          code: data.code,
          name: data.name,
          description: data.description,
          mainCategories: data.mainCategories
      };
  }
}
