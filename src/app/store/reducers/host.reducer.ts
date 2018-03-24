import { tassign } from 'tassign';
import * as _ from 'lodash';
import { IHostStore } from '../host.store';

export const hostCreateAttempt = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: true,
    error: null,
    success: null
  });
};

export const hostCreateFulfilled = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>( state, {
    hosts: [
      ...state.hosts,
      action.payload
    ],
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: null,
    success: `Host ID: ${action.payload._id} was successfully created`
  });
};

export const hostCreateFailed = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>( state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: action.error,
    success: null
  });
};

export const hostGetAttempt = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: true,
    error: null,
    success: null
  });
};

export const hostGetFulfilled = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: action.payload,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: null,
    success: `Hosts were successfully loaded`
  });
};

export const hostGetFailed = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: action.error,
    success: null
  });
};

export const hostUpdateAttempt = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: true,
    error: null,
    success: null
  });
};

export const hostUpdateFulfilled = (state: IHostStore, action: any) => {
  const index = _.findIndex(state.hosts, (h) => { return h.id == action.payload._id });
  let newArray = state.hosts.slice();
  newArray.splice(index, 1, action.payload);
  return tassign<IHostStore, IHostStore>(state, {
    hosts: newArray,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: null,
    success: `Host ID: ${action.payload._id} was successfully updated`
  });
};

export const hostUpdateFailed = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: action.error,
    success: null
  });
};

export const hostDeleteAttempt = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: true,
    error: null,
    success: null
  });
};

export const hostDeleteFufilled = (state: IHostStore, action: any) => {
  const newArray = _.remove(state.hosts, (h) => {
    return h._id != action.payload._id;
  });
  return tassign<IHostStore, IHostStore>(state, {
    hosts: newArray,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: null,
    success: `Host ID ${action.payload._id} was successfully deleted`
  });
};

export const hostDeleteFailed = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: action.error,
    success: null
  });
};

export const hostSelectAttempt = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: true,
    error: null,
    success: null
  });
};

export const hostSelectFulfilled = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: action.payload,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: null,
    success: `Host ID ${action.payload._id} was successfully loaded`
  });
};

export const hostSelectFailed = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: action.error,
    success: null
  });
};

export const hostDesignTypeUpdateAttempt = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: true,
    error: null,
    success: null
  });
}

export const hostDesignTypeUpdateFulfilled = (state: IHostStore, action: any) => {
  const index = _.findIndex(state.hosts, (h) => { return h._id === action.payload._id; });
  const host = {...state.hosts[index], isSpecific: action.payload.isSpecific};
  let newArray = state.hosts.slice();
  newArray.splice(index, 1, host);
  return tassign<IHostStore, IHostStore>(state, {
    hosts: newArray,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: null,
    success: `Host Design ID ${action.payload._id} was successfully updated`
  });
}

export const hostDesignTypeUpdateFailed = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: action.error,
    success: null
  });
}

export const hostResetSelectedFulfilled = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: null,
    selectedHostActiveDesign: null,
    spinner: false,
    error: null,
    success: null
  });
};

export const setHostActiveDesignAttempt = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: true,
    error: null,
    success: null
  });
}

export const setHostActiveDesignFulfilled = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: action.payload,
    spinner: false,
    error: null,
    success: null
  });
}

export const setHostActiveDesignFailed = (state: IHostStore, action: any) => {
  return tassign<IHostStore, IHostStore>(state, {
    hosts: state.hosts,
    selectedHost: state.selectedHost,
    selectedHostActiveDesign: state.selectedHostActiveDesign,
    spinner: false,
    error: action.error,
    success: null
  });
}
