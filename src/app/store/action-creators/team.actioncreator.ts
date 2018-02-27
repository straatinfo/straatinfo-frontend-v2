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
import { ITeamView } from '../../interface/team/team-view.interface';

@Injectable()

export class TeamActionCreator implements OnDestroy {

  private errorMessage: string;
  private getLatestTeamSubscription: Subscription = null;
  private getTeamSubscription: Subscription = null;
  private createTeamSubscription: Subscription = null;
  
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private teamService: TeamService
  ) {}

  ngOnDestroy() {
      (this.getLatestTeamSubscription) ? this.getLatestTeamSubscription.unsubscribe() : null;
      (this.getTeamSubscription) ? this.getTeamSubscription.unsubscribe() : null;
      (this.createTeamSubscription) ? this.createTeamSubscription.unsubscribe() : null;      
  } 

  GetTeams() {
      this.ngRedux.dispatch({ type: TEAM_GET_ATTEMPT });
      this.getTeamSubscription = this.teamService.GetTeams()
          .map((data: any[]) => { return data.map(d => this.ToTeamView(d)); })
          .subscribe(
          (team: ITeamView[]) => {
              this.ngRedux.dispatch({ type: TEAM_GET_FULFILLED, payload: team });
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

  CreateTeam(_userId: string, team: ITeamView) {
      this.ngRedux.dispatch({ type: TEAM_CREATE_ATTEMPT });
      this.createTeamSubscription = this.teamService.CreateTeam(_userId, team)
          .map(data => this.ToTeamView(data))
          .subscribe(
          (team: ITeamView) => {
              this.ngRedux.dispatch({ type: TEAM_CREATE_FULFILLED, payload: team });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: TEAM_CREATE_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  SetAsTeamLeader(_userId: string, _teamId: string) {
      this.ngRedux.dispatch({ type: TEAM_SELECT_ATTEMPT });
      this.getLatestTeamSubscription = this.teamService.SetAsTeamLeader(_userId, _teamId)
          .map(data => this.ToTeamView(data))
          .subscribe(
          (team: ITeamView) => {
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
          .map(data => this.ToTeamView(data))
          .subscribe(
          (team: ITeamView) => {
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

  SelectTeam(_id: string) {
      this.ngRedux.dispatch({ type: TEAM_SELECT_FULFILLED, payload: _id });
  }

  private ToTeamView(data: any): ITeamView {
      return {
          _id: data._id,
          teamName: data.teamName,
          teamEmail: data.teamEmail,
          isVolunteer: data.isVolunteer,
          _host: data._host,
      };
  }
}
