import { combineReducers } from 'redux';
import { SESSION_INITIAL_STATE, ISessionStore, sessionReducer } from './session.store';
import { HOST_INITIAL_STATE, IHostStore, hostReducer } from './host.store';
import { TABLE_INITIAL_STATE, ITableStore, tableReducer } from './table.store';
import { REPORT_INITIAL_STATE, IReportStore, reportReducer } from './report.store';

export interface IAppState {
  session: ISessionStore,
  host: IHostStore,
  report: IReportStore
}

export const INITIAL_STATE: IAppState = {
  session: SESSION_INITIAL_STATE,
  host: HOST_INITIAL_STATE,
  report: REPORT_INITIAL_STATE
}

export const rootReducer = combineReducers<IAppState>({
  session: sessionReducer,
  host: hostReducer,
  table: tableReducer,
  report: reportReducer
});
