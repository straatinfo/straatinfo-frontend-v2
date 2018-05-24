
import { tassign } from 'tassign';
import * as _ from 'lodash';
import { ILanguageStore } from './../language.store';

export const languageCreateAttempt = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    languages: state.languages,
    selectedLanguage: state.selectedLanguage,
    spinner: true,
    error: null,
    success: state.success,
    systemLanguage: state.systemLanguage
  });
};

export const languageCreateFulfilled = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: [
      ...state.languages,
      action.payload
    ],
    selectedLanguage: state.selectedLanguage,
    spinner: false,
    error: ''
  });
};

export const languageCreateFailed = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: state.languages,
    selectedLanguage: state.selectedLanguage,
    spinner: false,
    error: action.error
  });
};

export const languageGetAttempt = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: state.languages,
    selectedLanguage: state.selectedLanguage,
    spinner: true,
    error: ''
  });
};

export const languageGetFulfilled = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: action.payload,
    selectedLanguage: state.selectedLanguage,
    spinner: false,
    error: ''
  });
};

export const languageGetFailed = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: state.languages,
    selectedLanguage: state.selectedLanguage,
    spinner: false,
    error: action.error
  });
};

export const languageUpdateAttempt = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,...state,
    languages: state.languages,
    selectedLanguage: state.selectedLanguage,
    spinner: true,
    error: ''
  });
};

export const languageUpdateFulfilled = (state: ILanguageStore, action) => {
  const index = _.findIndex(state.languages, (h) => h._id === action.payload._id);
  const newArray = state.languages.slice();
  newArray.splice(index, 1, action.payload);
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: newArray,
    selectedLanguage: state.selectedLanguage,
    spinner: false,
    error: ''
  });
};

export const languageUpdateFailed = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: state.languages,
    selectedLanguage: state.selectedLanguage,
    spinner: false,
    error: action.error
  });
};

export const languageDeleteAttempt = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: state.languages,
    selectedLanguage: state.selectedLanguage,
    spinner: true,
    error: ''
  });
};

export const languageDeleteFufilled = (state: ILanguageStore, action) => {
  const newArray = _.remove(state.languages, (h) => {
    return h._id !== action.payload._id;
  });
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: newArray,
    selectedLanguage: state.selectedLanguage,
    spinner: false,
    error: ''
  });
};

export const languageDeleteFailed = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: state.languages,
    selectedLanguage: state.selectedLanguage,
    spinner: false,
    error: action.error
  });
};

export const languageSelectAttempt = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: state.languages,
    selectedLanguage: state.selectedLanguage,
    spinner: true,
    error: ''
  });
};

export const languageSelectFulfilled = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: state.languages,
    selectedLanguage: action.payload,
    spinner: false,
    error: ''
  });
};

export const languageSelectFailed = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    languages: state.languages,
    selectedLanguage: state.selectedLanguage,
    spinner: false,
    error: action.error
  });
};

export const systemLanguageSelectAttempt = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    spinner: true
  });
};

export const systemLanguageSelectFulfilled = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    systemLanguage: action.payload,
    spinner: false
  });
};

export const systemLanguageSelectFailed = (state: ILanguageStore, action) => {
  return tassign <ILanguageStore, ILanguageStore>(state, {
    ...state,
    error: action.error,
    spinner: false
  });
};
