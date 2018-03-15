import { IReporter } from '../interface/reporter/reporter.interface';

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
} from './actions/reporter.action';

import * as reporter from './reducers/reporter.reducer';
export interface IReporterStore {
  reporters: IReporter[];
  selectedReporter: IReporter;
  spinner: boolean;
  error: string;
  success: string;
}

export const REPORTER_INITIAL_STATE: IReporterStore = {
  reporters: [],
  selectedReporter: null,
  spinner: false,
  error: null,
  success: null
}

export function reporterReducer(state: IReporterStore = REPORTER_INITIAL_STATE, action): IReporterStore {
  switch (action.type){
    case REPORTER_CREATE_ATTEMPT: return reporter.reporterCreateAttempt(state, action);
    case REPORTER_CREATE_FAILED: return reporter.reporterCreateFailed(state, action);
    case REPORTER_CREATE_FULFILLED: return reporter.reporterCreateFulfilled(state, action);
    case REPORTER_GET_ATTEMPT: return reporter.reporterGetAttempt(state, action);
    case REPORTER_GET_FAILED: return reporter.reporterGetFailed(state, action);
    case REPORTER_GET_FULFILLED: return reporter.reporterGetFulfilled(state, action);
    case REPORTER_UPDATE_ATTEMPT: return reporter.reporterUpdateAttempt(state, action);
    case REPORTER_UPDATE_FAILED: return reporter.reporterUpdateFailed(state, action);
    case REPORTER_UPDATE_FULFILLED: return reporter.reporterUpdateFulfilled(state, action);
    case REPORTER_DELETE_ATTEMPT: return reporter.reporterDeleteAttempt(state, action);
    case REPORTER_DELETE_FAILED: return reporter.reporterDeleteFailed(state, action);
    case REPORTER_DELETE_FULFILLED: return reporter.reporterDeleteFufilled(state, action);
    case REPORTER_SELECT_ATTEMPT: return reporter.reporterSelectAttempt(state, action);
    case REPORTER_SELECT_FAILED: return reporter.reporterSelectFailed(state, action);
    case REPORTER_SELECT_FULFILLED: return reporter.reporterSelectFulfilled(state, action);
  }
  return state;
};
