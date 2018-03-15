import { IReportView } from '../interface/report/report-view.interface';

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
} from './actions/report.action';

import * as report from './reducers/report.reducer';
export interface IReportStore {
  reports: IReportView[];
  selectedReport: IReportView;
  spinner: boolean;
  error: string;
  success: string;
}

export const REPORT_INITIAL_STATE: IReportStore = {
  reports: [],
  selectedReport: null,
  spinner: false,
  error: null,
  success: null
}

export function reportReducer(state: IReportStore = REPORT_INITIAL_STATE, action): IReportStore {
  switch (action.type){
    case REPORT_CREATE_ATTEMPT: return report.reportCreateAttempt(state, action);
    case REPORT_CREATE_FAILED: return report.reportCreateFailed(state, action);
    case REPORT_CREATE_FULFILLED: return report.reportCreateFulfilled(state, action);
    case REPORT_GET_ATTEMPT: return report.reportGetAttempt(state, action);
    case REPORT_GET_FAILED: return report.reportGetFailed(state, action);
    case REPORT_GET_FULFILLED: return report.reportGetFulfilled(state, action);
    case REPORT_UPDATE_ATTEMPT: return report.reportUpdateAttempt(state, action);
    case REPORT_UPDATE_FAILED: return report.reportUpdateFailed(state, action);
    case REPORT_UPDATE_FULFILLED: return report.reportUpdateFulfilled(state, action);
    case REPORT_DELETE_ATTEMPT: return report.reportDeleteAttempt(state, action);
    case REPORT_DELETE_FAILED: return report.reportDeleteFailed(state, action);
    case REPORT_DELETE_FULFILLED: return report.reportDeleteFufilled(state, action);
    case REPORT_SELECT_ATTEMPT: return report.reportSelectAttempt(state, action);
    case REPORT_SELECT_FAILED: return report.reportSelectFailed(state, action);
    case REPORT_SELECT_FULFILLED: return report.reportSelectFulfilled(state, action);
  }
  return state;
};
