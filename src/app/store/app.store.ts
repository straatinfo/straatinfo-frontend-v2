import { combineReducers } from 'redux';
import { SESSION_INITIAL_STATE, ISessionStore, sessionReducer } from './session.store';

export interface IAppState {
  session: ISessionStore
}

export const INITIAL_STATE: IAppState = {
  session: SESSION_INITIAL_STATE
}

export const rootReducer = combineReducers<IAppState>({
  session: sessionReducer
});
