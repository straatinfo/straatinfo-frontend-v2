import { ITeam } from '../interface/team/team.interface';

import {
  TEAM_CREATE_ATTEMPT,
  TEAM_CREATE_FAILED,
  TEAM_CREATE_FULFILLED,
  TEAM_DELETE_ATTEMPT,
  TEAM_DELETE_FAILED,
  TEAM_DELETE_FULFILLED,
  TEAM_GET_ATTEMPT,
  TEAM_GET_FAILED,
  TEAM_GET_FULFILLED,
  TEAM_SELECT_ATTEMPT,
  TEAM_SELECT_FAILED,
  TEAM_SELECT_FULFILLED,
  TEAM_UPDATE_ATTEMPT,
  TEAM_UPDATE_FAILED,
  TEAM_UPDATE_FULFILLED,
  TEAM_PENDING_APPROVE_ATTEMPT,
  TEAM_PENDING_APPROVE_FAILED,
  TEAM_PENDING_APPROVE_FULFILLED,
  TEAM_PENDING_GET_ATTEMPT,
  TEAM_PENDING_GET_FAILED,
  TEAM_PENDING_GET_FULFILLED,
  TEAM_PENDING_DECLINE_ATTEMPT,
  TEAM_PENDING_DECLINE_FAILED,
  TEAM_PENDING_DECLINE_FULFILLED
} from './actions/team.action';

import * as team from './reducers/team.reducer';
export interface ITeamStore {
  teams: ITeam[];
  pendingTeams: ITeam[];
  selectedTeam: ITeam;
  spinner: boolean;
  error: string;
}

export const TEAM_INITIAL_STATE: ITeamStore = {
  teams: [],
  pendingTeams: [],
  selectedTeam: null,
  spinner: false,
  error: ''
}

export function teamReducer(state: ITeamStore = TEAM_INITIAL_STATE, action): ITeamStore {
  switch (action.type){
    case TEAM_CREATE_ATTEMPT: return team.teamCreateAttempt(state, action);
    case TEAM_CREATE_FAILED: return team.teamCreateFailed(state, action);
    case TEAM_CREATE_FULFILLED: return team.teamCreateFulfilled(state, action);
    case TEAM_GET_ATTEMPT: return team.teamGetAttempt(state, action);
    case TEAM_GET_FAILED: return team.teamGetFailed(state, action);
    case TEAM_GET_FULFILLED: return team.teamGetFulfilled(state, action);
    case TEAM_UPDATE_ATTEMPT: return team.teamUpdateAttempt(state, action);
    case TEAM_UPDATE_FAILED: return team.teamUpdateFailed(state, action);
    case TEAM_UPDATE_FULFILLED: return team.teamUpdateFulfilled(state, action);
    case TEAM_DELETE_ATTEMPT: return team.teamDeleteAttempt(state, action);
    case TEAM_DELETE_FAILED: return team.teamDeleteFailed(state, action);
    case TEAM_DELETE_FULFILLED: return team.teamDeleteFufilled(state, action);
    case TEAM_SELECT_ATTEMPT: return team.teamSelectAttempt(state, action);
    case TEAM_SELECT_FAILED: return team.teamSelectFailed(state, action);
    case TEAM_SELECT_FULFILLED: return team.teamSelectFulfilled(state, action);
    case TEAM_PENDING_APPROVE_ATTEMPT: return team.teamPendingApproveAttempt(state, action);
    case TEAM_PENDING_APPROVE_FAILED: return team.teamPendingApproveFailed(state, action);
    case TEAM_PENDING_APPROVE_FULFILLED: return team.teamPendingApproveFulfilled(state, action);
    case TEAM_PENDING_GET_ATTEMPT: return team.teamPendingGetAttempt(state, action);
    case TEAM_PENDING_GET_FAILED: return team.teamPendingGetFailed(state, action);
    case TEAM_PENDING_GET_FULFILLED: return team.teamPendingGetFulfilled(state, action);
    case TEAM_PENDING_DECLINE_ATTEMPT: return team.teamPendingDeclineAttempt(state, action);
    case TEAM_PENDING_DECLINE_FAILED: return team.teamPendingDeclineFailed(state, action);
    case TEAM_PENDING_DECLINE_FULFILLED: return team.teamPendingDeclineFulfilled(state, action);
  }
  return state;
};
