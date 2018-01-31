import * as table from './reducers/table.reducer';
import {
  TABLE_GET_PAGE,
  TABLE_RESET_PAGE,
  TABLE_UPDATE_PAGE
} from './actions/table.action';

export interface ITableStore {
  page: number;
}

export const TABLE_INITIAL_STATE: ITableStore = {
  page: 0
}

export function tableReducer(state: ITableStore = TABLE_INITIAL_STATE, action): ITableStore {
  switch (action.type){
    case TABLE_GET_PAGE: return table.tableGetPage(state, action);
    case TABLE_RESET_PAGE: return table.tableResetPage(state, action);
    case TABLE_UPDATE_PAGE: return table.tableUpdatePage(state, action);
  }
  return state;
};
