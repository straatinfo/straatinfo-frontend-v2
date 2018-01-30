import { combineReducers } from 'redux';
import { SESSION_INITIAL_STATE, ISessionStore, sessionReducer } from './session.store';
import { HOST_INITIAL_STATE, IHostStore, hostReducer } from './host.store';

export interface IAppState {
  session: ISessionStore,
  host: IHostStore
}

export const INITIAL_STATE: IAppState = {
  session: SESSION_INITIAL_STATE,
  host: HOST_INITIAL_STATE
}

export const rootReducer = combineReducers<IAppState>({
  session: sessionReducer,
  host: hostReducer
});
