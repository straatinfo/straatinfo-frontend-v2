import { tassign } from 'tassign';
import * as _ from 'lodash';

export const reporterCreateAttempt = (state, action) => {
  return tassign(state, {
    reporters: state.reporters,
    selectedReporter: state.selectedReporter,
    spinner: true,
    error: null
  });
};

export const reporterCreateFulfilled = (state, action) => {
  return tassign( state, {
    reporters: [
      ...state.reporters,
      action.payload
    ],
    selectedReporter: state.selectedReporter,
    spinner: false,
    error: ''
  });
};

export const reporterCreateFailed = (state, action) => {
  return tassign( state, {
    reporters: state.reporters,
    selectedReporter: state.selectedReporter,
    spinner: false,
    error: action.error
  });
};

export const reporterGetAttempt = (state, action) => {
  return tassign(state, {
    reporters: state.reporters,
    selectedReporter: state.selectedReporter,
    spinner: true,
    error: ''
  });
};

export const reporterGetFulfilled = (state, action) => {
  return tassign(state, {
    reporters: action.payload,
    selectedReporter: state.selectedReporter,
    spinner: false,
    error: ''
  });
};

export const reporterGetFailed = (state, action) => {
  return tassign(state, {
    reporters: state.reporters,
    selectedReporter: state.selectedReporter,
    spinner: false,
    error: action.error
  });
};

export const reporterUpdateAttempt = (state, action) => {
  return tassign(state, {
    reporters: state.reporters,
    selectedReporter: state.selectedReporter,
    spinner: true,
    error: ''
  });
};

export const reporterUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.reporters, (h) => { return h._id == action.payload.id });
  let newArray = state.reporters.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    reporters: newArray,
    selectedReporter: state.selectedReporter,
    spinner: false,
    error: ''
  });
};

export const reporterUpdateFailed = (state, action) => {
  return tassign(state, {
    reporters: state.reporters,
    selectedReporter: state.selectedReporter,
    spinner: false,
    error: action.error
  });
};

export const reporterDeleteAttempt = (state, action) => {
  return tassign(state, {
    reporters: state.reporters,
    selectedReporter: state.selectedReporter,
    spinner: true,
    error: ''
  });
};

export const reporterDeleteFufilled = (state, action) => {
  const newArray = _.remove(state.reporters, (h) => {
    return h.id != action.payload.id;
  });
  return tassign(state, {
    reporters: newArray,
    selectedReporter: state.selectedReporter,
    spinner: false,
    error: ''
  });
};

export const reporterDeleteFailed = (state, action) => {
  return tassign(state, {
    reporters: state.reporters,
    selectedReporter: state.selectedReporter,
    spinner: false,
    error: action.error
  });
};

export const reporterSelectAttempt = (state, action) => {
  return tassign(state, {
    reporters: state.reporters,
    selectedReporter: state.selectedReporter,
    spinner: true,
    error: ''
  });
};

export const reporterSelectFulfilled = (state, action) => {
  const index = _.findIndex(state.reporters, (h) => { return h._id == action.payload });
  return tassign(state, {
    reporters: state.reporters,
    selectedReporter: state.reporters[index],
    spinner: false,
    error: ''
  });
};

export const reporterSelectFailed = (state, action) => {
  return tassign(state, {
    reporters: state.reporters,
    selectedReporter: state.selectedReporter,
    spinner: false,
    error: action.error
  });
};
