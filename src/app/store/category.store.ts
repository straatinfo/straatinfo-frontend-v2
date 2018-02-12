import { IMainCategory } from '../interface/category/main-category.interface';
import {
  CATEGORY_CREATE_ATTEMPT,
  CATEGORY_CREATE_FAILED,
  CATEGORY_CREATE_FULFILLED,
  CATEGORY_DELETE_ATTEMPT,
  CATEGORY_DELETE_FAILED,
  CATEGORY_DELETE_FULFILLED,
  CATEGORY_GET_ATTEMPT,
  CATEGORY_GET_FAILED,
  CATEGORY_GET_FULFILLED,
  CATEGORY_UPDATE_ATTEMPT,
  CATEGORY_UPDATE_FAILED,
  CATEGORY_UPDATE_FULFILLED,
  CATEGORY_SELECT_ATTEMPT,
  CATEGORY_SELECT_FAILED,
  CATEGORY_SELECT_FULFILLED
} from './actions/category.action';
import * as category from './reducers/category.reducer';
export interface ICategoryStore {
  category: IMainCategory[];
  selectedCategory: IMainCategory;
  spinner: boolean;
  error: string;
}

export const CATEGORY_INITIAL_STATE: ICategoryStore = {
  category: [],
  selectedCategory: null,
  spinner: false,
  error: ''
}

export function categoryReducer(state: ICategoryStore = CATEGORY_INITIAL_STATE, action): ICategoryStore {
  switch (action.type){
    case CATEGORY_CREATE_ATTEMPT: return category.categoryCreateAttempt(state, action);
    case CATEGORY_CREATE_FAILED: return category.categoryCreateFailed(state, action);
    case CATEGORY_CREATE_FULFILLED: return category.categoryCreateFulfilled(state, action);
    case CATEGORY_GET_ATTEMPT: return category.categoryGetAttempt(state, action);
    case CATEGORY_GET_FAILED: return category.categoryGetFailed(state, action);
    case CATEGORY_GET_FULFILLED: return category.categoryGetFulfilled(state, action);
    case CATEGORY_UPDATE_ATTEMPT: return category.categoryUpdateAttempt(state, action);
    case CATEGORY_UPDATE_FAILED: return category.categoryUpdateFailed(state, action);
    case CATEGORY_UPDATE_FULFILLED: return category.categoryUpdateFulfilled(state, action);
    case CATEGORY_DELETE_ATTEMPT: return category.categoryDeleteAttempt(state, action);
    case CATEGORY_DELETE_FAILED: return category.categoryDeleteFailed(state, action);
    case CATEGORY_DELETE_FULFILLED: return category.categoryDeleteFufilled(state, action);
    case CATEGORY_SELECT_ATTEMPT: return category.categorySelectAttempt(state, action);
    case CATEGORY_SELECT_FAILED: return category.categorySelectFailed(state, action);
    case CATEGORY_SELECT_FULFILLED: return category.categorySelectFulfilled(state, action);
  }
  return state;
};
