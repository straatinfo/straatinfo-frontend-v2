import { tassign } from 'tassign';
import * as _ from 'lodash';

export const languageCreateAttempt = (state, action) => {
    return tassign(state, {
        languages: state.languages,
        selectedLanguage: state.selectedLanguage,
        spinner: true,
        error: null
    });
};

export const languageCreateFulfilled = (state, action) => {
    return tassign(state, {
        languages: [
            ...state.languages,
            action.payload
        ],
        selectedLanguage: state.selectedLanguage,
        spinner: false,
        error: ''
    });
};

export const languageCreateFailed = (state, action) => {
    return tassign(state, {
        languages: state.languages,
        selectedLanguage: state.selectedLanguage,
        spinner: false,
        error: action.error
    });
};

export const languageGetAttempt = (state, action) => {
    return tassign(state, {
        languages: state.languages,
        selectedLanguage: state.selectedLanguage,
        spinner: true,
        error: ''
    });
};

export const languageGetFulfilled = (state, action) => {
    return tassign(state, {
        languages: action.payload,
        selectedLanguage: state.selectedLanguage,
        spinner: false,
        error: ''
    });
};

export const languageGetFailed = (state, action) => {
    return tassign(state, {
        languages: state.languages,
        selectedLanguage: state.selectedLanguage,
        spinner: false,
        error: action.error
    });
};

export const languageUpdateAttempt = (state, action) => {
    return tassign(state, {
        languages: state.languages,
        selectedLanguage: state.selectedLanguage,
        spinner: true,
        error: ''
    });
};

export const languageUpdateFulfilled = (state, action) => {
    const index = _.findIndex(state.languages, (h) => { return h._id == action.payload._id });
    let newArray = state.languages.slice();
    newArray.splice(index, 1, action.payload);
    return tassign(state, {
        languages: newArray,
        selectedLanguage: state.selectedLanguage,
        spinner: false,
        error: ''
    });
};

export const languageUpdateFailed = (state, action) => {
    return tassign(state, {
        languages: state.languages,
        selectedLanguage: state.selectedLanguage,
        spinner: false,
        error: action.error
    });
};

export const languageDeleteAttempt = (state, action) => {
    return tassign(state, {
        languages: state.languages,
        selectedLanguage: state.selectedLanguage,
        spinner: true,
        error: ''
    });
};

export const languageDeleteFufilled = (state, action) => {
    const newArray = _.remove(state.languages, (h) => {
        return h._id != action.payload._id;
    });
    return tassign(state, {
        languages: newArray,
        selectedLanguage: state.selectedLanguage,
        spinner: false,
        error: ''
    });
};

export const languageDeleteFailed = (state, action) => {
    return tassign(state, {
        languages: state.languages,
        selectedLanguage: state.selectedLanguage,
        spinner: false,
        error: action.error
    });
};

export const languageSelectAttempt = (state, action) => {
    return tassign(state, {
        languages: state.languages,
        selectedLanguage: state.selectedLanguage,
        spinner: true,
        error: ''
    });
};

export const languageSelectFulfilled = (state, action) => {
    return tassign(state, {
        languages: state.languages,
        selectedLanguage: action.payload,
        spinner: false,
        error: ''
    });
};

export const languageSelectFailed = (state, action) => {
    return tassign(state, {
        languages: state.languages,
        selectedLanguage: state.selectedLanguage,
        spinner: false,
        error: action.error
    });
};
