import { tassign } from 'tassign';
import * as _ from 'lodash';

export const tableGetPage = (state, action) => {
  return tassign(state, {
    page: action.payload
  });
};

export const tableUpdatePage = (state, action) => {
  return tassign(state, {
    page: action.payload
  });
}

export const tableResetPage = (state, action) => {
  return tassign(state, {
    page: 0
  });
};
