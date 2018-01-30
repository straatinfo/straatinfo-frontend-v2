import { tassign } from 'tassign';

export const sessionCreateAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    token: state.token,
    spinner: true,
    error: null
  });
};

export const sessionCreateFulfilled = (state, action) => {
  return tassign( state, {
    user: action.payload.user,
    token: action.payload.token,
    spinner: false,
    error: ''
  });
};

export const sessionCreateFailed = (state, action) => {
  return tassign( state, {
    user: state.user,
    token: state.token,
    spinner: false,
    error: action.error
  });
};

export const sessionCheckAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    token: state.token,
    spinner: true,
    error: ''
  });
};

export const sessionCheckFulfilled = (state, action) => {
  return tassign(state, {
    user: action.payload.user,
    token: action.payload.token,
    spinner: false,
    error: ''
  });
};

export const sessionCheckFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    token: state.token,
    spinner: false,
    error: action.error
  });
};

export const sessionDestroy = (state, action) => {
  return tassign(state, {
    user: null,
    token: null,
    spinner: false,
    error: ''
  });
};

export const sessionPasswordChangeAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    token: state.token,
    spinner: true,
    error: ''
  });
};

export const sessionPasswordChangeFulfilled = (state, action) => {
  return tassign(state, {
    user: state.user,
    token: action.payload.token,
    spinner: false,
    error: ''
  });
};

export const sessionPasswordChangeFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    token: state.token,
    spinner: false,
    error: action.error
  });
};