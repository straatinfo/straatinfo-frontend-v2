import { tassign } from 'tassign';
import * as _ from 'lodash';

export const getInvitationCodeFulfilled = (state, action) => {
  return tassign(state, {
    invitationCode: action.payload,
    toggleForgotPassword: false,
    signInBufferPage: state.signInBufferPage,
    pageTitle: state.pageTitle,
    uploadResult: state.uploadResult,
    spinner: false
  });
};

export const toggleForgotPassword = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: (state.toggleForgotPassword) ? false : true,
    signInBufferPage: state.signInBufferPage,
    pageTitle: state.pageTitle,
    uploadResult: state.uploadResult,
    spinner: false
  });
};

export const signInBufferPageOn = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: false,
    signInBufferPage: true,
    pageTitle: state.pageTitle,
    uploadResult: state.uploadResult,
    spinner: false
  });
};

export const signInBufferPageOff = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: false,
    signInBufferPage: false,
    pageTitle: state.pageTitle,
    uploadResult: state.uploadResult,
    spinner: false
  });
};

export const updatePageTitleFulfilled = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: state.toggleForgotPassword,
    signInBufferPage: state.signInBufferPage,
    pageTitle: action.payload,
    uploadResult: state.uploadResult,
    spinner: false
  });
};

export const loadSpinner = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: state.toggleForgotPassword,
    signInBufferPage: state.signInBufferPage,
    pageTitle: state.pageTitle,
    uploadResult: state.uploadResult,
    spinner: true
  });
};

export const unloadSpinner = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: state.toggleForgotPassword,
    signInBufferPage: state.signInBufferPage,
    pageTitle: state.pageTitle,
    uploadResult: state.uploadResult,
    spinner: false
  });
};

export const fileUploadFulfilled = (state, action) => {
  return tassign(state, {
    invitationCode: state.invitationCode,
    toggleForgotPassword: state.toggleForgotPassword,
    signInBufferPage: state.signInBufferPage,
    pageTitle: state.pageTitle,
    uploadResult: action.payload,
    spinner: false
  });
}
