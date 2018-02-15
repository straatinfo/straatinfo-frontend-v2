import { tassign } from 'tassign';
import * as _ from 'lodash';

export const reportTypeCreateAttempt = (state, action) => {
    return tassign(state, {
        reportTypes: state.reportTypes,
        selectedReportType: state.selectedReportType,
        spinner: true,
        error: null
    });
};

export const reportTypeCreateFulfilled = (state, action) => {
    return tassign(state, {
        reportTypes: [
            ...state.reportTypes,
            action.payload
        ],
        selectedReportType: state.selectedReportType,
        spinner: false,
        error: ''
    });
};

export const reportTypeCreateFailed = (state, action) => {
    return tassign(state, {
        reportTypes: state.reportTypes,
        selectedReportType: state.selectedReportType,
        spinner: false,
        error: action.error
    });
};

export const reportTypeGetAttempt = (state, action) => {
    return tassign(state, {
        reportTypes: state.reportTypes,
        selectedReportType: state.selectedReportType,
        spinner: true,
        error: ''
    });
};

export const reportTypeGetFulfilled = (state, action) => {
    return tassign(state, {
        reportTypes: action.payload,
        selectedReportType: state.selectedReportType,
        spinner: false,
        error: ''
    });
};

export const reportTypeGetFailed = (state, action) => {
    return tassign(state, {
        reportTypes: state.reportTypes,
        selectedReportType: state.selectedReportType,
        spinner: false,
        error: action.error
    });
};

export const reportTypeUpdateAttempt = (state, action) => {
    return tassign(state, {
        reportTypes: state.reportTypes,
        selectedReportType: state.selectedReportType,
        spinner: true,
        error: ''
    });
};

export const reportTypeUpdateFulfilled = (state, action) => {
    const index = _.findIndex(state.reportTypes, (h) => { return h.id == action.payload.id });
    let newArray = state.reportTypes.slice();
    newArray.splice(index, 1, action.payload);
    return tassign(state, {
        reportTypes: newArray,
        selectedReportType: state.selectedReportType,
        spinner: false,
        error: ''
    });
};

export const reportTypeUpdateFailed = (state, action) => {
    return tassign(state, {
        reportTypes: state.reportTypes,
        selectedReportType: state.selectedReportType,
        spinner: false,
        error: action.error
    });
};

export const reportTypeDeleteAttempt = (state, action) => {
    return tassign(state, {
        reportTypes: state.reportTypes,
        selectedReportType: state.selectedReportType,
        spinner: true,
        error: ''
    });
};

export const reportTypeDeleteFufilled = (state, action) => {
    const newArray = _.remove(state.reportTypes, (h) => {
        return h.id != action.payload.id;
    });
    return tassign(state, {
        reportTypes: newArray,
        selectedReportType: state.selectedReportType,
        spinner: false,
        error: ''
    });
};

export const reportTypeDeleteFailed = (state, action) => {
    return tassign(state, {
        reportTypes: state.reportTypes,
        selectedReportType: state.selectedReportType,
        spinner: false,
        error: action.error
    });
};

export const reportTypeSelectAttempt = (state, action) => {
    return tassign(state, {
        reportTypes: state.reportTypes,
        selectedReportType: state.selectedReportType,
        spinner: true,
        error: ''
    });
};

export const reportTypeSelectFulfilled = (state, action) => {
    const index = _.findIndex(state.reportTypes, (h) => { return h._id == action.payload });
    return tassign(state, {
        reportTypes: state.reportTypes,
        selectedReportType: state.reportTypes[index],
        spinner: false,
        error: ''
    });
};

export const reportTypeSelectFailed = (state, action) => {
    return tassign(state, {
        reportTypes: state.reportTypes,
        selectedReportType: state.selectedReportType,
        spinner: false,
        error: action.error
    });
};
