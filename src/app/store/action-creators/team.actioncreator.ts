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
  TEAM_UPDATE_FULFILLED,
  TEAM_PENDING_APPROVE_ATTEMPT,
  TEAM_PENDING_GET_ATTEMPT,
  TEAM_PENDING_GET_FAILED,
  TEAM_PENDING_GET_FULFILLED,
  TEAM_PENDING_APPROVE_FULFILLED,
  TEAM_PENDING_DECLINE_ATTEMPT,
  TEAM_PENDING_DECLINE_FAILED,
  TEAM_PENDING_DECLINE_FULFILLED,
  TEAM_PENDING_APPROVE_FAILED
} from '../actions/team.action';
import { Subscription } from 'rxjs/Subscription';
import { TeamService, DialogService } from '../../services';
import { ITeamView } from '../../interface/team/team-view.interface';
import { ITeam } from '../../interface/team/team.interface';
import * as _ from 'lodash';

@Injectable()

export class TeamActionCreator implements OnDestroy {

  private errorMessage: string;
  private getLatestTeamSubscription: Subscription = null;
  private getTeamSubscription: Subscription = null;
  private createTeamSubscription: Subscription = null;
  private getNonApprovedTeamSubscription: Subscription = null;
  private approveTeamSubscription: Subscription = null;
  private declineTeamSubscription: Subscription = null;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private teamService: TeamService,
    private dialogService: DialogService
  ) { }

  ngOnDestroy() {
    (this.getLatestTeamSubscription) ? this.getLatestTeamSubscription.unsubscribe() : null;
    (this.getTeamSubscription) ? this.getTeamSubscription.unsubscribe() : null;
    (this.createTeamSubscription) ? this.createTeamSubscription.unsubscribe() : null;
    (this.getNonApprovedTeamSubscription) ? this.getNonApprovedTeamSubscription.unsubscribe() : null;
    (this.approveTeamSubscription) ? this.approveTeamSubscription.unsubscribe() : null;
    (this.declineTeamSubscription) ? this.declineTeamSubscription.unsubscribe() : null;
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

  GetTeamsWithFilter(_host: string) {
    this.ngRedux.dispatch({ type: TEAM_GET_ATTEMPT });
    this.getTeamSubscription = this.teamService.GetTeamsWithFilter(_host)
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
    this.ngRedux.dispatch({ type: TEAM_UPDATE_ATTEMPT });
    this.getLatestTeamSubscription = this.teamService.SetAsTeamLeader(_userId, _teamId)
      .map(data => this.ToTeamView(data))
      .subscribe(
        (team: ITeamView) => {
          this.ngRedux.dispatch({ type: TEAM_UPDATE_FULFILLED, payload: team });
        }, err => {
          this.errorMessage = err._body;
          if (this.errorMessage && typeof this.errorMessage === 'string') {
            this.ngRedux.dispatch({ type: TEAM_UPDATE_FAILED, error: this.errorMessage });
          }
        },
        () => {
          this.errorMessage = null;
        }
      );
  }

  SetAsTeamMember(_userId: string, _teamId: string) {
    this.ngRedux.dispatch({ type: TEAM_UPDATE_ATTEMPT });
    this.getLatestTeamSubscription = this.teamService.SetAsTeamMember(_userId, _teamId)
      .map(data => this.ToTeamView(data))
      .subscribe(
        (team: ITeamView) => {
          this.ngRedux.dispatch({ type: TEAM_UPDATE_FULFILLED, payload: team });
        }, err => {
          this.errorMessage = err._body;
          if (this.errorMessage && typeof this.errorMessage === 'string') {
            this.ngRedux.dispatch({ type: TEAM_UPDATE_FAILED, error: this.errorMessage });
          }
        },
        () => {
          this.errorMessage = null;
        }
      );
  }

  JoinTeam(_userId: string, _teamId: string) {
    this.ngRedux.dispatch({ type: TEAM_SELECT_ATTEMPT });
    this.getLatestTeamSubscription = this.teamService.JoinTeam(_userId, _teamId)
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

  GetNonApprovedTeam() {
    this.ngRedux.dispatch({ type: TEAM_PENDING_GET_ATTEMPT });
    this.getNonApprovedTeamSubscription = this.teamService.GetNonApprovedTeam()
      .map((data: any[]) => { return data.map(d => this.ToTeamView(d)); })
      .subscribe(
        (teams: ITeamView[]) => {
          this.ngRedux.dispatch({ type: TEAM_PENDING_GET_FULFILLED, payload: teams });
        }, err => {
          this.errorMessage = err._body;
          if (this.errorMessage && typeof this.errorMessage === 'string') {
            this.ngRedux.dispatch({ type: TEAM_PENDING_GET_FAILED, error: this.errorMessage });
          }
        },
        () => {
          this.errorMessage = null;
        }
      );
  }

  ApproveTeam(_id) {
    this.ngRedux.dispatch({ type: TEAM_PENDING_APPROVE_ATTEMPT });
    this.approveTeamSubscription = this.teamService.ApproveTeam(_id)
      .subscribe(
        (team: ITeam) => {
          this.ngRedux.dispatch({ type: TEAM_PENDING_APPROVE_FULFILLED, payload: team });
          this.GetNonApprovedTeam();
          this.dialogService.showSwal('success-message', { title: 'Team Approved', text: `Successfully approved team: ${team.teamName}` })
        }, err => {
          this.errorMessage = err._body;
          if (this.errorMessage && typeof this.errorMessage === 'string') {
            this.ngRedux.dispatch({ type: TEAM_PENDING_APPROVE_FAILED, error: this.errorMessage });
            this.dialogService.showSwal('error-message', { title: 'Error', text: this.errorMessage });
          }
        },
        () => {
          this.errorMessage = null;
        }
      );
  }

  DeclineTeam(_id) {
    this.ngRedux.dispatch({ type: TEAM_PENDING_DECLINE_ATTEMPT });
    this.declineTeamSubscription = this.teamService.DeclineTeam(_id)
      .subscribe(
        (team: ITeam) => {
          this.ngRedux.dispatch({ type: TEAM_PENDING_DECLINE_FULFILLED, payload: team });
          this.GetNonApprovedTeam();
          this.dialogService.showSwal('success-message', { title: 'Team Declined', text: `Successfully declined team: ${team.teamName}` })
        }, err => {
          this.errorMessage = err._body;
          if (this.errorMessage && typeof this.errorMessage === 'string') {
            this.ngRedux.dispatch({ type: TEAM_PENDING_DECLINE_FAILED, error: this.errorMessage });
            this.dialogService.showSwal('error-message', { title: 'Error', text: this.errorMessage });
          }
        },
        () => {
          this.errorMessage = null;
        }
      );
  }

  GetReporterNonApprovedTeam(hostId: string) {
    this.ngRedux.dispatch({ type: TEAM_PENDING_GET_ATTEMPT });
    this.getNonApprovedTeamSubscription = this.teamService.GetNonApprovedTeam()
      .map((data: any[]) => { return data.map(d => this.ToTeamView(d)); })
      .map((data: any[]) => {
        const newArray = _.filter(data, (h) => {
          return h._host == hostId;
        });
        return newArray;
      })
      .subscribe(
        (teams: ITeamView[]) => {
          this.ngRedux.dispatch({ type: TEAM_PENDING_GET_FULFILLED, payload: teams });
        }, err => {
          this.errorMessage = err._body;
          if (this.errorMessage && typeof this.errorMessage === 'string') {
            this.ngRedux.dispatch({ type: TEAM_PENDING_GET_FAILED, error: this.errorMessage });
          }
        },
        () => {
          this.errorMessage = null;
        }
      );
  }

  ReporterApproveTeam(_id) {
    this.ngRedux.dispatch({ type: TEAM_PENDING_APPROVE_ATTEMPT });
    this.approveTeamSubscription = this.teamService.ApproveTeam(_id)
      .subscribe(
        (team: ITeam) => {
          this.ngRedux.dispatch({ type: TEAM_PENDING_APPROVE_FULFILLED, payload: team });
          this.GetReporterNonApprovedTeam(team._host);
          this.dialogService.showSwal('success-message', { title: 'Team Approved', text: `Successfully approved team: ${team.teamName}` })
        }, err => {
          this.errorMessage = err._body;
          if (this.errorMessage && typeof this.errorMessage === 'string') {
            this.ngRedux.dispatch({ type: TEAM_PENDING_APPROVE_FAILED, error: this.errorMessage });
            this.dialogService.showSwal('error-message', { title: 'Error', text: this.errorMessage });
          }
        },
        () => {
          this.errorMessage = null;
        }
      );
  }

  ReporterDeclineTeam(_id) {
    this.ngRedux.dispatch({ type: TEAM_PENDING_DECLINE_ATTEMPT });
    this.declineTeamSubscription = this.teamService.DeclineTeam(_id)
      .subscribe(
        (team: ITeam) => {
          this.ngRedux.dispatch({ type: TEAM_PENDING_DECLINE_FULFILLED, payload: team });
          this.GetReporterNonApprovedTeam(team._host);
          this.dialogService.showSwal('success-message', { title: 'Team Declined', text: `Successfully declined team: ${team.teamName}` })
        }, err => {
          this.errorMessage = err._body;
          if (this.errorMessage && typeof this.errorMessage === 'string') {
            this.ngRedux.dispatch({ type: TEAM_PENDING_DECLINE_FAILED, error: this.errorMessage });
            this.dialogService.showSwal('error-message', { title: 'Error', text: this.errorMessage });
          }
        },
        () => {
          this.errorMessage = null;
        }
      );
  }


  private ToTeamView(data: any): ITeamView {
    return {
      _id: data._id,
      teamName: data.teamName,
      teamEmail: data.teamEmail,
      isVolunteer: data.isVolunteer,
      isApproved: data.isApproved,
      _host: data['_host._id'],
      _hostEmail: data['_host.email'],
      _hostName: data['_host.hostName'],
      teamLeaders: data.teamLeaders,
      teamMembers: data.teamMembers
    };
  }
}
