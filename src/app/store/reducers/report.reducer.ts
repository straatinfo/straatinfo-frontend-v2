import { tassign } from 'tassign';
import * as _ from 'lodash';

export const reportCreateAttempt = (state, action) => {
    return tassign(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: true,
        error: null
    });
};

export const reportCreateFulfilled = (state, action) => {
    return tassign(state, {
        reports: [
            ...state.reports,
            action.payload
        ],
        selectedReport: state.selectedReport,
        spinner: false,
        error: ''
    });
};

export const reportCreateFailed = (state, action) => {
    return tassign(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: false,
        error: action.error
    });
};

export const reportGetAttempt = (state, action) => {
    return tassign(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: true,
        error: ''
    });
};

export const reportGetFulfilled = (state, action) => {
    return tassign(state, {
        reports: action.payload,
        selectedReport: state.selectedReport,
        spinner: false,
        error: ''
    });
};

export const reportGetFailed = (state, action) => {
    return tassign(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: false,
        error: action.error
    });
};

export const reportUpdateAttempt = (state, action) => {
    return tassign(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: true,
        error: ''
    });
};

export const reportUpdateFulfilled = (state, action) => {
    const index = _.findIndex(state.reports, (h) => { return h.id == action.payload.id });
    let newArray = state.reports.slice();
    newArray.splice(index, 1, action.payload);
    return tassign(state, {
        reports: newArray,
        selectedReport: state.selectedReport,
        spinner: false,
        error: ''
    });
};

export const reportUpdateFailed = (state, action) => {
    return tassign(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: false,
        error: action.error
    });
};

export const reportDeleteAttempt = (state, action) => {
    return tassign(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: true,
        error: ''
    });
};

export const reportDeleteFufilled = (state, action) => {
    const newArray = _.remove(state.reports, (h) => {
        return h.id != action.payload.id;
    });
    return tassign(state, {
        reports: newArray,
        selectedReport: state.selectedReport,
        spinner: false,
        error: ''
    });
};

export const reportDeleteFailed = (state, action) => {
    return tassign(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: false,
        error: action.error
    });
};

export const reportSelectAttempt = (state, action) => {
    return tassign(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: true,
        error: ''
    });
};

export const reportSelectFulfilled = (state, action) => {
    const index = _.findIndex(state.reports, (h) => { return h._id == action.payload });
    return tassign(state, {
        reports: state.reports,
        selectedReport: state.reports[index],
        spinner: false,
        error: ''
    });
};

export const reportSelectFailed = (state, action) => {
    return tassign(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: false,
        error: action.error
    });
};
