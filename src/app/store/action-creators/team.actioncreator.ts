import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../app.store';
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
  TEAM_UPDATE_FULFILLED
} from '../actions/team.action';
import { Subscription } from 'rxjs/Subscription';
import { TeamService } from '../../services';
import { ITeam } from '../../interface/team/team.interface';


@Injectable()

export class TeamActionCreator implements OnDestroy {

  private errorMessage: string;
  private getLatestTeamSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private teamService: TeamService
  ) {}

  ngOnDestroy() {
      (this.getLatestTeamSubscription) ? this.getLatestTeamSubscription.unsubscribe() : null;
  }

  SetAsTeamLeader(_userId: string, _teamId: string) {
      this.ngRedux.dispatch({ type: TEAM_SELECT_ATTEMPT });
      this.getLatestTeamSubscription = this.teamService.SetAsTeamLeader(_userId, _teamId)
          .map(data => this.TeamToView(data))
          .subscribe(
          (team: ITeam) => {
              this.ngRedux.dispatch({ type: TEAM_SELECT_FULFILLED, payload: team });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: TEAM_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  SetAsTeamMember(_userId: string, _teamId: string) {
      this.ngRedux.dispatch({ type: TEAM_SELECT_ATTEMPT });
      this.getLatestTeamSubscription = this.teamService.SetAsTeamMember(_userId, _teamId)
          .map(data => this.TeamToView(data))
          .subscribe(
          (team: ITeam) => {
              this.ngRedux.dispatch({ type: TEAM_SELECT_FULFILLED, payload: team });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: TEAM_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  private TeamToView(data: any): ITeam {
      return {
          _id: data._id,
      };
  }
}
