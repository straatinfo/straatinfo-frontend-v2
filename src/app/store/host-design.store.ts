import { IHostDesign } from '../interface/host/host-design.interface';
import {
  HOSTDESIGN_CREATE_ATTEMPT,
  HOSTDESIGN_CREATE_FAILED,
  HOSTDESIGN_CREATE_FULFILLED,
  HOSTDESIGN_DELETE_ATTEMPT,
  HOSTDESIGN_DELETE_FAILED,
  HOSTDESIGN_DELETE_FULFILLED,
  HOSTDESIGN_GET_ATTEMPT,
  HOSTDESIGN_GET_FAILED,
  HOSTDESIGN_GET_FULFILLED,
  HOSTDESIGN_UPDATE_ATTEMPT,
  HOSTDESIGN_UPDATE_FAILED,
  HOSTDESIGN_UPDATE_FULFILLED,
  HOSTDESIGN_SELECT_ATTEMPT,
  HOSTDESIGN_SELECT_FAILED,
  HOSTDESIGN_SELECT_FULFILLED
} from './actions/host-design.action';
import * as hostDesign from './reducers/host-design.reducer';
export interface IHostDesignStore {
  hostDesigns: IHostDesign[];
  selectedHost: IHostDesign;
  spinner: boolean;
  error: string;
}

export const HOSTDESIGN_INITIAL_STATE: IHostDesignStore = {
  hostDesigns: [],
  selectedHost: null,
  spinner: false,
  error: ''
}

export function hostDesignReducer(state: IHostDesignStore = HOSTDESIGN_INITIAL_STATE, action): IHostDesignStore {
  switch (action.type){
    case HOSTDESIGN_CREATE_ATTEMPT: return hostDesign.hostDesignCreateAttempt(state, action);
    case HOSTDESIGN_CREATE_FAILED: return hostDesign.hostDesignCreateFailed(state, action);
    case HOSTDESIGN_CREATE_FULFILLED: return hostDesign.hostDesignCreateFulfilled(state, action);
    case HOSTDESIGN_GET_ATTEMPT: return hostDesign.hostDesignGetAttempt(state, action);
    case HOSTDESIGN_GET_FAILED: return hostDesign.hostDesignGetFailed(state, action);
    case HOSTDESIGN_GET_FULFILLED: return hostDesign.hostDesignGetFulfilled(state, action);
    case HOSTDESIGN_UPDATE_ATTEMPT: return hostDesign.hostDesignUpdateAttempt(state, action);
    case HOSTDESIGN_UPDATE_FAILED: return hostDesign.hostDesignUpdateFailed(state, action);
    case HOSTDESIGN_UPDATE_FULFILLED: return hostDesign.hostDesignUpdateFulfilled(state, action);
    case HOSTDESIGN_DELETE_ATTEMPT: return hostDesign.hostDesignDeleteAttempt(state, action);
    case HOSTDESIGN_DELETE_FAILED: return hostDesign.hostDesignDeleteFailed(state, action);
    case HOSTDESIGN_DELETE_FULFILLED: return hostDesign.hostDesignDeleteFufilled(state, action);
    case HOSTDESIGN_SELECT_ATTEMPT: return hostDesign.hostDesignSelectAttempt(state, action);
    case HOSTDESIGN_SELECT_FAILED: return hostDesign.hostDesignSelectFailed(state, action);
    case HOSTDESIGN_SELECT_FULFILLED: return hostDesign.hostDesignSelectFulfilled(state, action);
  }
  return state;
};
