import { tassign } from 'tassign';
import * as _ from 'lodash';

export const hostDesignCreateAttempt = (state, action) => {
  return tassign(state, {
    hostDesigns: state.hostDesigns,
    selectedHost: state.selectedHost,
    spinner: true,
    error: null
  });
};

export const hostDesignCreateFulfilled = (state, action) => {
  return tassign( state, {
    hostDesigns: [
      ...state.hostDesigns,
      action.payload
    ],
    selectedHost: state.selectedHost,
    spinner: false,
    error: ''
  });
};

export const hostDesignCreateFailed = (state, action) => {
  return tassign( state, {
    hostDesigns: state.hostDesigns,
    selectedHost: state.selectedHost,
    spinner: false,
    error: action.error
  });
};

export const hostDesignGetAttempt = (state, action) => {
  return tassign(state, {
    hostDesigns: state.hostDesigns,
    selectedHost: state.selectedHost,
    spinner: true,
    error: ''
  });
};

export const hostDesignGetFulfilled = (state, action) => {
  return tassign(state, {
    hostDesigns: action.payload,
    selectedHost: state.selectedHost,
    spinner: false,
    error: ''
  });
};

export const hostDesignGetFailed = (state, action) => {
  return tassign(state, {
    hostDesigns: state.hostDesigns,
    selectedHost: state.selectedHost,
    spinner: false,
    error: action.error
  });
};

export const hostDesignUpdateAttempt = (state, action) => {
  return tassign(state, {
    hostDesigns: state.hostDesigns,
    selectedHost: state.selectedHost,
    spinner: true,
    error: ''
  });
};

export const hostDesignUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.hostDesigns, (h) => { return h.id == action.payload.id });
  let newArray = state.hostDesigns.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    hostDesigns: newArray,
    selectedHost: state.selectedHost,
    spinner: false,
    error: ''
  });
};

export const hostDesignUpdateFailed = (state, action) => {
  return tassign(state, {
    hostDesigns: state.hostDesigns,
    selectedHost: state.selectedHost,
    spinner: false,
    error: action.error
  });
};

export const hostDesignDeleteAttempt = (state, action) => {
  return tassign(state, {
    hostDesigns: state.hostDesigns,
    selectedHost: state.selectedHost,
    spinner: true,
    error: ''
  });
};

export const hostDesignDeleteFufilled = (state, action) => {
  const newArray = _.remove(state.hostDesigns, (h) => {
    return h.id != action.payload.id;
  });
  return tassign(state, {
    hostDesigns: newArray,
    selectedHost: state.selectedHost,
    spinner: false,
    error: ''
  });
};

export const hostDesignDeleteFailed = (state, action) => {
  return tassign(state, {
    hostDesigns: state.hostDesigns,
    selectedHost: state.selectedHost,
    spinner: false,
    error: action.error
  });
};

export const hostDesignSelectAttempt = (state, action) => {
  return tassign(state, {
    hostDesigns: state.hostDesigns,
    selectedHost: state.selectedHost,
    spinner: true,
    error: ''
  });
};

export const hostDesignSelectFulfilled = (state, action) => {
  const index = _.findIndex(state.hostDesigns, (h) => { return h.id == action.payload });
  return tassign(state, {
    hostDesigns: state.hostDesigns,
    selectedHost: state.hostDesigns[index],
    spinner: false,
    error: ''
  });
};

export const hostDesignSelectFailed = (state, action) => {
  return tassign(state, {
    hostDesigns: state.hostDesigns,
    selectedHost: state.selectedHost,
    spinner: false,
    error: action.error
  });
};
