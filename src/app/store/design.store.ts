import { IDesign } from '../interface/design/design.interface';
import {
  DESIGN_CREATE_ATTEMPT,
  DESIGN_CREATE_FAILED,
  DESIGN_CREATE_FULFILLED,
  DESIGN_DELETE_ATTEMPT,
  DESIGN_DELETE_FAILED,
  DESIGN_DELETE_FULFILLED,
  DESIGN_GET_ATTEMPT,
  DESIGN_GET_FAILED,
  DESIGN_GET_FULFILLED,
  DESIGN_UPDATE_ATTEMPT,
  DESIGN_UPDATE_FAILED,
  DESIGN_UPDATE_FULFILLED,
  DESIGN_SELECT_ATTEMPT,
  DESIGN_SELECT_FAILED,
  DESIGN_SELECT_FULFILLED
} from './actions/design.action';
import * as design from './reducers/design.reducer';
import { IDesignView } from '../interface/design/design-view.interface';
export interface IDesignStore {
  designs: IDesignView[];
  selectedDesign: IDesignView;
  spinner: boolean;
  error: string;
  success: string;
}

export const DESIGN_INITIAL_STATE: IDesignStore = {
  designs: [],
  selectedDesign: null,
  spinner: false,
  error: null,
  success: null
}

export function designReducer(state: IDesignStore = DESIGN_INITIAL_STATE, action): IDesignStore {
  switch (action.type){
    case DESIGN_CREATE_ATTEMPT: return design.designCreateAttempt(state, action);
    case DESIGN_CREATE_FAILED: return design.designCreateFailed(state, action);
    case DESIGN_CREATE_FULFILLED: return design.designCreateFulfilled(state, action);
    case DESIGN_GET_ATTEMPT: return design.designGetAttempt(state, action);
    case DESIGN_GET_FAILED: return design.designGetFailed(state, action);
    case DESIGN_GET_FULFILLED: return design.designGetFulfilled(state, action);
    case DESIGN_UPDATE_ATTEMPT: return design.designUpdateAttempt(state, action);
    case DESIGN_UPDATE_FAILED: return design.designUpdateFailed(state, action);
    case DESIGN_UPDATE_FULFILLED: return design.designUpdateFulfilled(state, action);
    case DESIGN_DELETE_ATTEMPT: return design.designDeleteAttempt(state, action);
    case DESIGN_DELETE_FAILED: return design.designDeleteFailed(state, action);
    case DESIGN_DELETE_FULFILLED: return design.designDeleteFufilled(state, action);
    case DESIGN_SELECT_ATTEMPT: return design.designSelectAttempt(state, action);
    case DESIGN_SELECT_FAILED: return design.designSelectFailed(state, action);
    case DESIGN_SELECT_FULFILLED: return design.designSelectFulfilled(state, action);
  }
  return state;
};
