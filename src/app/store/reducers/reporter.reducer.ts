import { tassign } from 'tassign';
import * as _ from 'lodash';
import { IReporterStore } from '../reporter.store';

export const reporterCreateAttempt = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: state.selectedReporter,
        spinner: true,
        error: null,
        success: null
    });
};

export const reporterCreateFulfilled = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: [
            ...state.reporters,
            action.payload
        ],
        selectedReporter: state.selectedReporter,
        spinner: false,
        error: null,
        success: `Reporter ID: ${action.payload._id} was successfully created`
    });
};

export const reporterCreateFailed = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: state.selectedReporter,
        spinner: false,
        error: action.error,
        success: null
    });
};

export const reporterGetAttempt = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: state.selectedReporter,
        spinner: true,
        error: null,
        success: null
    });
};

export const reporterGetFulfilled = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: action.payload,
        selectedReporter: state.selectedReporter,
        spinner: false,
        error: null,
        success: `Reporters were successfully loaded`
    });
};

export const reporterGetFailed = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: state.selectedReporter,
        spinner: false,
        error: action.error,
        success: null
    });
};

export const reporterUpdateAttempt = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: state.selectedReporter,
        spinner: true,
        error: null,
        success: null
    });
};

export const reporterUpdateFulfilled = (state: IReporterStore, action: any) => {
    const index = _.findIndex(state.reporters, (h) => { return h.id == action.payload._id });
    let newArray = state.reporters.slice();
    newArray.splice(index, 1, action.payload);
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: newArray,
        selectedReporter: state.selectedReporter,
        spinner: false,
        error: null,
        success: `Reporter was successfully updated`
    });
};

export const reporterUpdateFailed = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: state.selectedReporter,
        spinner: false,
        error: action.error,
        success: null
    });
};

export const reporterDeleteAttempt = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: state.selectedReporter,
        spinner: true,
        error: null,
        success: null
    });
};

export const reporterDeleteFufilled = (state: IReporterStore, action: any) => {
    const newArray = _.remove(state.reporters, (h) => {
        return h._id != action.payload._id;
    });
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: newArray,
        selectedReporter: state.selectedReporter,
        spinner: false,
        error: null,
        success: `Reporter was successfully deleted`
    });
};

export const reporterDeleteFailed = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: state.selectedReporter,
        spinner: false,
        error: action.error,
        success: null
    });
};

export const reporterSelectAttempt = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: state.selectedReporter,
        spinner: true,
        error: null,
        success: null
    });
};

export const reporterSelectFulfilled = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: action.payload,
        spinner: false,
        error: null,
        success: `Reporter was successfully loaded`
    });
};

export const reporterSelectFailed = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: state.selectedReporter,
        spinner: false,
        error: action.error,
        success: null
    });
};

export const reporterDesignTypeUpdateAttempt = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: state.selectedReporter,
        spinner: true,
        error: null,
        success: null
    });
}

export const reporterDesignTypeUpdateFulfilled = (state: IReporterStore, action: any) => {
    const index = _.findIndex(state.reporters, (h) => { return h._id === action.payload._id; });
    const reporter = {...state.reporters[index], isSpecific: action.payload.isSpecific };
    let newArray = state.reporters.slice();
    newArray.splice(index, 1, reporter);
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: newArray,
        selectedReporter: state.selectedReporter,
        spinner: false,
        error: null,
        success: `Reporter Design was successfully updated`
    });
}

export const reporterDesignTypeUpdateFailed = (state: IReporterStore, action: any) => {
    return tassign<IReporterStore, IReporterStore>(state, {
        reporters: state.reporters,
        selectedReporter: state.selectedReporter,
        spinner: false,
        error: action.error,
        success: null
    });
}
