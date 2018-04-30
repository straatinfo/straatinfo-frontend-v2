import { ILanguage } from '../interface/language/language.interface';
import {
  LANGUAGE_CREATE_ATTEMPT,
  LANGUAGE_CREATE_FAILED,
  LANGUAGE_CREATE_FULFILLED,
  LANGUAGE_DELETE_ATTEMPT,
  LANGUAGE_DELETE_FAILED,
  LANGUAGE_DELETE_FULFILLED,
  LANGUAGE_GET_ATTEMPT,
  LANGUAGE_GET_FAILED,
  LANGUAGE_GET_FULFILLED,
  LANGUAGE_UPDATE_ATTEMPT,
  LANGUAGE_UPDATE_FAILED,
  LANGUAGE_UPDATE_FULFILLED,
  LANGUAGE_SELECT_ATTEMPT,
  LANGUAGE_SELECT_FAILED,
  LANGUAGE_SELECT_FULFILLED,
  LANGUAGE_DESIGN_TYPE_UPDATE_ATTEMPT,
  LANGUAGE_DESIGN_TYPE_UPDATE_FAILED,
  LANGUAGE_DESIGN_TYPE_UPDATE_FULFILLED,
  LANGUAGE_RESET_SELECT_FULFILLED,
  LANGUAGE_SELECT_ACTIVE_DESIGN_ATTEMPT,
  LANGUAGE_SELECT_ACTIVE_DESIGN_FAILED,
  LANGUAGE_SELECT_ACTIVE_DESIGN_FULFILLED
} from './actions/language.action';
import * as language from './reducers/language.reducer';

export interface ILanguageStore {
  languages: ILanguage[];
  selectedHost: ILanguage;
  spinner: boolean;
  error: string;
  success: string;
}

export const LANGUAGE_INITIAL_STATE: ILanguageStore = {
  languages: [],
  selectedHost: null,
  spinner: false,
  error: null,
  success: null
}

export function languageReducer(state: ILanguageStore = LANGUAGE_INITIAL_STATE, action): ILanguageStore {
  switch (action.type){
    case LANGUAGE_CREATE_ATTEMPT: return language.languageCreateAttempt(state, action);
    case LANGUAGE_CREATE_FAILED: return language.languageCreateFailed(state, action);
    case LANGUAGE_CREATE_FULFILLED: return language.languageCreateFulfilled(state, action);
    case LANGUAGE_GET_ATTEMPT: return language.languageGetAttempt(state, action);
    case LANGUAGE_GET_FAILED: return language.languageGetFailed(state, action);
    case LANGUAGE_GET_FULFILLED: return language.languageGetFulfilled(state, action);
    case LANGUAGE_UPDATE_ATTEMPT: return language.languageUpdateAttempt(state, action);
    case LANGUAGE_UPDATE_FAILED: return language.languageUpdateFailed(state, action);
    case LANGUAGE_UPDATE_FULFILLED: return language.languageUpdateFulfilled(state, action);
    case LANGUAGE_DELETE_ATTEMPT: return language.languageDeleteAttempt(state, action);
    case LANGUAGE_DELETE_FAILED: return language.languageDeleteFailed(state, action);
    case LANGUAGE_DELETE_FULFILLED: return language.languageDeleteFufilled(state, action);
    case LANGUAGE_SELECT_ATTEMPT: return language.languageSelectAttempt(state, action);
    case LANGUAGE_SELECT_FAILED: return language.languageSelectFailed(state, action);
    case LANGUAGE_SELECT_FULFILLED: return language.languageSelectFulfilled(state, action);
  }
  return state;
};
