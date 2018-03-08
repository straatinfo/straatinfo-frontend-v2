import { tassign } from 'tassign';
import * as _ from 'lodash';

export const hostCreateAttempt = (state, action) => {
  return tassign(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    spinner: true,
    error: null
  });
};

export const hostCreateFulfilled = (state, action) => {
  return tassign( state, {
    hosts: [
      ...state.hosts,
      action.payload
    ],
    selectedHost: state.selectedHost,
    spinner: false,
    error: ''
  });
};

export const hostCreateFailed = (state, action) => {
  return tassign( state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    spinner: false,
    error: action.error
  });
};

export const hostGetAttempt = (state, action) => {
  return tassign(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    spinner: true,
    error: ''
  });
};

export const hostGetFulfilled = (state, action) => {
  return tassign(state, {
    hosts: action.payload,
    selectedHost: state.selectedHost,
    spinner: false,
    error: ''
  });
};

export const hostGetFailed = (state, action) => {
  return tassign(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    spinner: false,
    error: action.error
  });
};

export const hostUpdateAttempt = (state, action) => {
  return tassign(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    spinner: true,
    error: ''
  });
};

export const hostUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.hosts, (h) => { return h.id == action.payload.id });
  let newArray = state.hosts.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    hosts: newArray,
    selectedHost: state.selectedHost,
    spinner: false,
    error: ''
  });
};

export const hostUpdateFailed = (state, action) => {
  return tassign(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    spinner: false,
    error: action.error
  });
};

export const hostDeleteAttempt = (state, action) => {
  return tassign(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    spinner: true,
    error: ''
  });
};

export const hostDeleteFufilled = (state, action) => {
  const newArray = _.remove(state.hosts, (h) => {
    return h.id != action.payload.id;
  });
  return tassign(state, {
    hosts: newArray,
    selectedHost: state.selectedHost,
    spinner: false,
    error: ''
  });
};

export const hostDeleteFailed = (state, action) => {
  return tassign(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    spinner: false,
    error: action.error
  });
};

export const hostSelectAttempt = (state, action) => {
  return tassign(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    spinner: true,
    error: ''
  });
};

export const hostSelectFulfilled = (state, action) => {
  const index = _.findIndex(state.hosts, (h) => { return h._id == action.payload });
  return tassign(state, {
    hosts: state.hosts,
    selectedHost: state.hosts[index],
    spinner: false,
    error: ''
  });
};

export const hostSelectFailed = (state, action) => {
  return tassign(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    spinner: false,
    error: action.error
  });
};

export const hostDesignTypeUpdateAttempt = (state, action) => {
  return tassign(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    spinner: true,
    error: ''
  });
}

export const hostDesignTypeUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.hosts, (h) => { return h._id === action.payload._id; });
  const host = {...state.hosts[index], isSpecific: action.payload.isSpecific};
  let newArray = state.hosts.slice();
  newArray.splice(index, 1, host);
  return tassign(state, {
    hosts: newArray,
    selectedHost: state.selectedHost,
    spinner: false,
    error: ''
  });
}

export const hostDesignTypeUpdateFailed = (state, action) => {
  return tassign(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    spinner: false,
    error: action.error
  });
}
