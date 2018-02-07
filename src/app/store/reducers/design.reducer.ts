import { tassign } from 'tassign';
import * as _ from 'lodash';

export const designCreateAttempt = (state, action) => {
  return tassign(state, {
    designs: state.designs,
    selectedDesign: state.selectedDesign,
    spinner: true,
    error: null
  });
};

export const designCreateFulfilled = (state, action) => {
  return tassign( state, {
    designs: [
      ...state.designs,
      action.payload
    ],
    selectedDesign: state.selectedDesign,
    spinner: false,
    error: ''
  });
};

export const designCreateFailed = (state, action) => {
  return tassign( state, {
    designs: state.designs,
    selectedDesign: state.selectedDesign,
    spinner: false,
    error: action.error
  });
};

export const designGetAttempt = (state, action) => {
  return tassign(state, {
    designs: state.designs,
    selectedDesign: state.selectedDesign,
    spinner: true,
    error: ''
  });
};

export const designGetFulfilled = (state, action) => {
  return tassign(state, {
    designs: action.payload,
    selectedDesign: state.selectedDesign,
    spinner: false,
    error: ''
  });
};

export const designGetFailed = (state, action) => {
  return tassign(state, {
    designs: state.designs,
    selectedDesign: state.selectedDesign,
    spinner: false,
    error: action.error
  });
};

export const designUpdateAttempt = (state, action) => {
  return tassign(state, {
    designs: state.designs,
    selectedDesign: state.selectedDesign,
    spinner: true,
    error: ''
  });
};

export const designUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.designs, (h) => { return h.id == action.payload.id });
  let newArray = state.designs.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    designs: newArray,
    selectedDesign: state.selectedDesign,
    spinner: false,
    error: ''
  });
};

export const designUpdateFailed = (state, action) => {
  return tassign(state, {
    designs: state.designs,
    selectedDesign: state.selectedDesign,
    spinner: false,
    error: action.error
  });
};

export const designDeleteAttempt = (state, action) => {
  return tassign(state, {
    designs: state.designs,
    selectedDesign: state.selectedDesign,
    spinner: true,
    error: ''
  });
};

export const designDeleteFufilled = (state, action) => {
  const newArray = _.remove(state.designs, (h) => {
    return h.id != action.payload.id;
  });
  return tassign(state, {
    designs: newArray,
    selectedDesign: state.selectedDesign,
    spinner: false,
    error: ''
  });
};

export const designDeleteFailed = (state, action) => {
  return tassign(state, {
    designs: state.designs,
    selectedDesign: state.selectedDesign,
    spinner: false,
    error: action.error
  });
};

export const designSelectAttempt = (state, action) => {
  return tassign(state, {
    designs: state.designs,
    selectedDesign: state.selectedDesign,
    spinner: true,
    error: ''
  });
};

export const designSelectFulfilled = (state, action) => {
  const index = _.findIndex(state.designs, (h) => { return h.id == action.payload });
  return tassign(state, {
    designs: state.designs,
    selectedDesign: state.designs[index],
    spinner: false,
    error: ''
  });
};

export const designSelectFailed = (state, action) => {
  return tassign(state, {
    designs: state.designs,
    selectedDesign: state.selectedDesign,
    spinner: false,
    error: action.error
  });
};
