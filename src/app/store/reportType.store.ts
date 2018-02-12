import { IReportType } from '../interface/report/report-type.interface';
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
  REPORTTYPE_SELECT_ATTEMPT,
  REPORTTYPE_SELECT_FAILED,
  REPORTTYPE_SELECT_FULFILLED
} from './actions/reportType.action';
import * as reportType from './reducers/reportType.reducer';
export interface IReportTypeStore {
  reportType: IReportType[];
  selectedReportType: IReportType;
  spinner: boolean;
  error: string;
}

export const REPORTTYPE_INITIAL_STATE: IReportTypeStore = {
  reportType: [],
  selectedReportType: null,
  spinner: false,
  error: ''
}

export function reportTypeReducer(state: IReportTypeStore = REPORTTYPE_INITIAL_STATE, action): IReportTypeStore {
  switch (action.type){
    case REPORTTYPE_CREATE_ATTEMPT: return reportType.reportTypeCreateAttempt(state, action);
    case REPORTTYPE_CREATE_FAILED: return reportType.reportTypeCreateFailed(state, action);
    case REPORTTYPE_CREATE_FULFILLED: return reportType.reportTypeCreateFulfilled(state, action);
    case REPORTTYPE_GET_ATTEMPT: return reportType.reportTypeGetAttempt(state, action);
    case REPORTTYPE_GET_FAILED: return reportType.reportTypeGetFailed(state, action);
    case REPORTTYPE_GET_FULFILLED: return reportType.reportTypeGetFulfilled(state, action);
    case REPORTTYPE_UPDATE_ATTEMPT: return reportType.reportTypeUpdateAttempt(state, action);
    case REPORTTYPE_UPDATE_FAILED: return reportType.reportTypeUpdateFailed(state, action);
    case REPORTTYPE_UPDATE_FULFILLED: return reportType.reportTypeUpdateFulfilled(state, action);
    case REPORTTYPE_DELETE_ATTEMPT: return reportType.reportTypeDeleteAttempt(state, action);
    case REPORTTYPE_DELETE_FAILED: return reportType.reportTypeDeleteFailed(state, action);
    case REPORTTYPE_DELETE_FULFILLED: return reportType.reportTypeDeleteFufilled(state, action);
    case REPORTTYPE_SELECT_ATTEMPT: return reportType.reportTypeSelectAttempt(state, action);
    case REPORTTYPE_SELECT_FAILED: return reportType.reportTypeSelectFailed(state, action);
    case REPORTTYPE_SELECT_FULFILLED: return reportType.reportTypeSelectFulfilled(state, action);
  }
  return state;
};
