import { IHost } from '../interface/host/host.interface';
import {
  HOST_CREATE_ATTEMPT,
  HOST_CREATE_FAILED,
  HOST_CREATE_FULFILLED,
  HOST_DELETE_ATTEMPT,
  HOST_DELETE_FAILED,
  HOST_DELETE_FULFILLED,
  HOST_GET_ATTEMPT,
  HOST_GET_FAILED,
  HOST_GET_FULFILLED,
  HOST_UPDATE_ATTEMPT,
  HOST_UPDATE_FAILED,
  HOST_UPDATE_FULFILLED,
  HOST_SELECT_ATTEMPT,
  HOST_SELECT_FAILED,
  HOST_SELECT_FULFILLED,
  HOST_DESIGN_TYPE_UPDATE_ATTEMPT,
  HOST_DESIGN_TYPE_UPDATE_FAILED,
  HOST_DESIGN_TYPE_UPDATE_FULFILLED,
  HOST_RESET_SELECT_FULFILLED
} from './actions/host.action';
import * as host from './reducers/host.reducer';
export interface IHostStore {
  hosts: IHost[];
  selectedHost: IHost;
  spinner: boolean;
  error: string;
  success: string;
}

export const HOST_INITIAL_STATE: IHostStore = {
  hosts: [],
  selectedHost: null,
  spinner: false,
  error: null,
  success: null
}

export function hostReducer(state: IHostStore = HOST_INITIAL_STATE, action): IHostStore {
  switch (action.type){
    case HOST_CREATE_ATTEMPT: return host.hostCreateAttempt(state, action);
    case HOST_CREATE_FAILED: return host.hostCreateFailed(state, action);
    case HOST_CREATE_FULFILLED: return host.hostCreateFulfilled(state, action);
    case HOST_GET_ATTEMPT: return host.hostGetAttempt(state, action);
    case HOST_GET_FAILED: return host.hostGetFailed(state, action);
    case HOST_GET_FULFILLED: return host.hostGetFulfilled(state, action);
    case HOST_UPDATE_ATTEMPT: return host.hostUpdateAttempt(state, action);
    case HOST_UPDATE_FAILED: return host.hostUpdateFailed(state, action);
    case HOST_UPDATE_FULFILLED: return host.hostUpdateFulfilled(state, action);
    case HOST_DELETE_ATTEMPT: return host.hostDeleteAttempt(state, action);
    case HOST_DELETE_FAILED: return host.hostDeleteFailed(state, action);
    case HOST_DELETE_FULFILLED: return host.hostDeleteFufilled(state, action);
    case HOST_SELECT_ATTEMPT: return host.hostSelectAttempt(state, action);
    case HOST_SELECT_FAILED: return host.hostSelectFailed(state, action);
    case HOST_SELECT_FULFILLED: return host.hostSelectFulfilled(state, action);
    case HOST_DESIGN_TYPE_UPDATE_ATTEMPT: return host.hostDesignTypeUpdateAttempt(state, action);
    case HOST_DESIGN_TYPE_UPDATE_FAILED: return host.hostDesignTypeUpdateFailed(state, action);
    case HOST_DESIGN_TYPE_UPDATE_FULFILLED: return host.hostDesignTypeUpdateFulfilled(state, action);
    case HOST_RESET_SELECT_FULFILLED: return host.hostResetSelectedFulfilled(state, action);
  }
  return state;
};
