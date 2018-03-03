import { tassign } from 'tassign';
import * as _ from 'lodash';

export const teamCreateAttempt = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: null
  });
};

export const teamCreateFulfilled = (state, action) => {
  return tassign(state, {
    teams: [
      ...state.teams,
      action.payload
    ],
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: ''
  });
};

export const teamCreateFailed = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error
  });
};

export const teamGetAttempt = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: ''
  });
};

export const teamGetFulfilled = (state, action) => {
  return tassign(state, {
    teams: action.payload,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: ''
  });
};

export const teamGetFailed = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error
  });
};

export const teamUpdateAttempt = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: ''
  });
};

export const teamUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.teams, (h) => { return h.id == action.payload.id });
  let newArray = state.teams.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    teams: newArray,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: ''
  });
};

export const teamUpdateFailed = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error
  });
};

export const teamDeleteAttempt = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: ''
  });
};

export const teamDeleteFufilled = (state, action) => {
  const newArray = _.remove(state.teams, (h) => {
    return h.id != action.payload.id;
  });
  return tassign(state, {
    teams: newArray,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: ''
  });
};

export const teamDeleteFailed = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error
  });
};

export const teamSelectAttempt = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: ''
  });
};

export const teamSelectFulfilled = (state, action) => {
  const index = _.findIndex(state.teams, (h) => { return h._id == action.payload });
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.teams[index],
    spinner: false,
    error: ''
  });
};

export const teamSelectFailed = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error
  });
};

export const teamPendingGetAttempt = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: ''
  });
};

export const teamPendingGetFulfilled = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: action.payload,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: ''
  });
};

export const teamPendingGetFailed = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.payload,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error
  });
};

export const teamPendingApproveAttempt = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: ''
  });
};

export const teamPendingApproveFulfilled = (state, action) => {
  const newArray = _.remove(state.pendingTeams, (t) => {
    return t._id != action.payload._id;
  });
  return tassign(state, {
    teams: state.teams,
    pendingTeams: newArray,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: ''
  });
};

export const teamPendingApproveFailed = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.payload,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error
  });
};

export const teamPendingDeclineAttempt = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: ''
  });
};

export const teamPendingDeclineFulfilled = (state, action) => {
  const newArray = _.remove(state.pendingTeams, (t) => {
    return t._id != action.payload._id;
  });
  return tassign(state, {
    teams: state.teams,
    pendingTeams: newArray,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: ''
  });
};

export const teamPendingDeclineFailed = (state, action) => {
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.payload,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error
  });
};
