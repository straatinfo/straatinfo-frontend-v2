import { tassign } from 'tassign';
import * as _ from 'lodash';
import { IReportStore } from '../report.store';

export const reportCreateAttempt = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: true,
        error: null,
        success: null
    });
};

export const reportCreateFulfilled = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: [
            ...state.reports,
            action.payload
        ],
        selectedReport: state.selectedReport,
        spinner: false,
        error: null,
        success: `Report was successfully created`
    });
};

export const reportCreateFailed = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: false,
        error: action.error,
        success: null
    });
};

export const reportGetAttempt = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: true,
        error: null,
        success: null
    });
};

export const reportGetFulfilled = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: action.payload,
        selectedReport: state.selectedReport,
        spinner: false,
        error: null,
        success: `Reports were successfully loaded`
    });
};

export const reportGetFailed = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: false,
        error: action.error,
        success: null
    });
};

export const reportUpdateAttempt = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: true,
        error: null,
        success: null
    });
};

export const reportUpdateFulfilled = (state: IReportStore, action: any) => {
    const index = _.findIndex(state.reports, (h) => { return h.id == action.payload._id });
    let newArray = state.reports.slice();
    newArray.splice(index, 1, action.payload);
    return tassign<IReportStore, IReportStore>(state, {
        reports: newArray,
        selectedReport: state.selectedReport,
        spinner: false,
        error: null,
        success: `Report was successfully updated`
    });
};

export const reportUpdateFailed = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: false,
        error: action.error,
        success: null
    });
};

export const reportDeleteAttempt = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: true,
        error: null,
        success: null
    });
};

export const reportDeleteFufilled = (state: IReportStore, action: any) => {
    const newArray = _.remove(state.reports, (h) => {
        return h._id != action.payload._id;
    });
    return tassign<IReportStore, IReportStore>(state, {
        reports: newArray,
        selectedReport: state.selectedReport,
        spinner: false,
        error: null,
        success: `Report was successfully deleted`
    });
};

export const reportDeleteFailed = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: false,
        error: action.error,
        success: null
    });
};

export const reportSelectAttempt = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: true,
        error: null,
        success: null
    });
};

export const reportSelectFulfilled = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: action.payload,
        spinner: false,
        error: null,
        success: `Report was successfully loaded`
    });
};

export const reportSelectFailed = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: false,
        error: action.error,
        success: null
    });
};

export const reportDesignTypeUpdateAttempt = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: true,
        error: null,
        success: null
    });
}

export const reportDesignTypeUpdateFulfilled = (state: IReportStore, action: any) => {
    const index = _.findIndex(state.reports, (h) => { return h._id === action.payload._id; });
    const report = {...state.reports[index], isSpecific: action.payload.isSpecific };
    let newArray = state.reports.slice();
    newArray.splice(index, 1, report);
    return tassign<IReportStore, IReportStore>(state, {
        reports: newArray,
        selectedReport: state.selectedReport,
        spinner: false,
        error: null,
        success: `Report Design was successfully updated`
    });
}

export const reportDesignTypeUpdateFailed = (state: IReportStore, action: any) => {
    return tassign<IReportStore, IReportStore>(state, {
        reports: state.reports,
        selectedReport: state.selectedReport,
        spinner: false,
        error: action.error,
        success: null
    });
}
