import { tassign } from 'tassign';
import * as _ from 'lodash';
import { ITeamStore } from '../team.store';

export const teamCreateAttempt = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: null,
    success: null
  });
};

export const teamCreateFulfilled = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: [
      ...state.teams,
      action.payload
    ],
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: null,
    success: `Team was successfully created`
  });
};

export const teamCreateFailed = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error,
    success: null
  });
};

export const teamGetAttempt = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: null,
    success: null
  });
};

export const teamGetFulfilled = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: action.payload,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: null,
    success: null,
  });
};

export const teamGetFailed = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error,
    success: null,
  });
};

export const teamUpdateAttempt = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: null,
    success: null,
  });
};

export const teamUpdateFulfilled = (state: ITeamStore, action: any) => {
    const index = _.findIndex(state.teams, (h) => { return h.id == action.payload._id });
  let newArray = state.teams.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    teams: newArray,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: null,
    success: `Team was successfully updated`
  });
};

export const teamUpdateFailed = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error,
    success: null,
  });
};

export const teamDeleteAttempt = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: null,
    success: null,
  });
};

export const teamDeleteFufilled = (state: ITeamStore, action: any) => {
    const newArray = _.remove(state.teams, (h) => {
    return h.id != action.payload.id;
  });
  return tassign(state, {
    teams: newArray,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: null,
    success: `Team was successfully deleted`
  });
};

export const teamDeleteFailed = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error,
    success: null,
  });
};

export const teamSelectAttempt = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: null,
    success: null,
  });
};

export const teamSelectFulfilled = (state: ITeamStore, action: any) => {
    const index = _.findIndex(state.teams, (h) => { return h.id == action.payload._id });
  return tassign(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.teams[index],
    spinner: false,
    error: null,
    success: null,
  });
};

export const teamSelectFailed = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error,
    success: null,
  });
};

export const teamPendingGetAttempt = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: null,
    success: null,
  });
};

export const teamPendingGetFulfilled = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: action.payload,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: null,
    success: null,
  });
};

export const teamPendingGetFailed = (state, action) => {
    return tassign(state, {
    teams: state.teams,
    pendingTeams: state.payload,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error,
    success: null,
  });
};

export const teamPendingApproveAttempt = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: null,
    success: null,
  });
};

export const teamPendingApproveFulfilled = (state: ITeamStore, action: any) => {
    const newArray = _.remove(state.teams, (h) => {
        return h._id != action.payload._id;
    });
  return tassign(state, {
    teams: state.teams,
    pendingTeams: newArray,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: null,
    success: null,
  });
};

export const teamPendingApproveFailed = (state, action) => {
    return tassign(state, {
    teams: state.teams,
    pendingTeams: state.payload,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error,
    success: null,
  });
};

export const teamPendingDeclineAttempt = (state: ITeamStore, action: any) => {
    return tassign<ITeamStore, ITeamStore>(state, {
    teams: state.teams,
    pendingTeams: state.pendingTeams,
    selectedTeam: state.selectedTeam,
    spinner: true,
    error: null,
    success: null,
  });
};

export const teamPendingDeclineFulfilled = (state: ITeamStore, action: any) => {
    const newArray = _.remove(state.teams, (h) => {
        return h._id != action.payload._id;
    });
  return tassign(state, {
    teams: state.teams,
    pendingTeams: newArray,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: null,
    success: null,
  });
};

export const teamPendingDeclineFailed = (state, action) => {
    return tassign(state, {
    teams: state.teams,
    pendingTeams: state.payload,
    selectedTeam: state.selectedTeam,
    spinner: false,
    error: action.error,
    success: null,
  });
};
