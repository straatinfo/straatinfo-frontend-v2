import { AddTeamDialogComponent } from './../add-team-dialog/add-team-dialog.component';

import { ReporterTeamOptionDialogComponent } from './../reporter-team-option-dialog/reporter-team-option-dialog.component';
import { RoutingState } from './../../services/router-state.service';

import { ITeam } from './../../interface/team/team.interface';
import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { mergeMap, flatMap, pairwise } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ReporterActionCreator, TeamActionCreator, HostActionCreator } from '../../store/action-creators';
import { IReporter } from 'app/interface/reporter/reporter.interface';
import { IReporterView } from 'app/interface/reporter/reporter-view.interface';
import { IReporterStore } from '../../store/reporter.store';
import { ITeamStore } from '../../store/team.store';
import { IHostView } from '../../interface/host/host-view.interface';
import { ITeamView } from '../../interface/team/team-view.interface';

@Component({
  selector: 'app-team-setup',
  templateUrl: './team-setup.component.html',
  styleUrls: ['./team-setup.component.scss']
})
export class TeamSetupComponent implements OnInit, DoCheck, OnDestroy {

  private routeParamsSubscription: Subscription = null;
  private reporterSubscription: Subscription = null;
  private reporterHostTeamSubscription: Subscription = null;
  private routerSubscription: Subscription = null;
  public isLoading: boolean = false;
  public hostName: string;
  public host: any;
  public reporterName: string;
  public reporter: any;
  public reporterId: string;
  public activeTeamName: string;
  private previousRoute: string;
  @select(s => s.reporter.selectedReporter) selectedReporter$: Observable<IReporterView>;
  @select(s => s.host.selectedHost) selectedHost$: Observable<IHostView>;
  @select(s => s.team.teams) teams$: Observable<ITeam[]>;
  @select(s => s.team.spinner) teamSpinner$: Observable<boolean>;
  @select(s => s.host.spinner) hostSpinner$: Observable<boolean>;
  @select(s => s.reporter.spinner) reporterSpinner$: Observable<boolean>;

  private reporterHostTeamObservable: Observable<{ reporter: IReporterView, host: IHostView, teams: ITeamView[] }> = Observable.create((observer) => {
    observer.next();
    observer.complete();
    this.isLoading = true;
  })
    .flatMap(() => {
      return this.activatedRoute.params;
    })
    .flatMap((params) => {
      this.reporterActionCreator.SelectReporter(params._reporterId);
      return this.selectedReporter$;
    })
    .flatMap((reporter: IReporterView) => {
      reporter ? this.hostActionCreator.SelectHost(reporter.hostId) : null;
      return this.selectedHost$.map(host => {
        return { reporter, host };
      });
    })
    .flatMap((result) => {
      result && result.host ? this.teamActionCreator.GetTeamsWithFilter(result.host._id) : null;
      return this.teams$.map((teams: ITeamView[]) => {
        this.isLoading = false;
        return { reporter: result.reporter, host: result.host, teams };
      });
    });
    public hostTeamTable: any = {
      headerAlias: ['Team Name', 'Host', 'Volunteer'],
      headerName: ['teamName', '_hostName', 'isVolunteer']
    };
    public hostTeamTableData: Observable<ITeamView[]>;
    public reporterTeamTable: any = {
      headerAlias: ['Team Name', 'Volunteer', 'Role'],
      headerName: ['teamName', 'isVolunteer', 'role']
    };
    public reporterTeamTableData: Observable<any[]>;
    private dialogRef: any;
    private dialogRefSubscription: Subscription = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamActionCreator: TeamActionCreator,
    private router: Router,
    private reporterActionCreator: ReporterActionCreator,
    private hostActionCreator: HostActionCreator,
    private routingState: RoutingState,
    public dialog: MatDialog
  ) {
    this.routingState.loadRouting();
  }


  ngOnInit() {
    this.isLoading = true;
    this.reporterActionCreator.ResetSelectedReporter();
    this.reporterHostTeamSubscription = this.reporterHostTeamObservable
      .subscribe(
        result => {
          if (result && result.host && result.reporter && result.teams) {
            this.loadPageData(result);
            this.isLoading = false;
          }
        }, err => {
          this.isLoading = false;
        }
      );
  }

  ngDoCheck() {

  }

  ngOnDestroy() {
    this.reporterHostTeamSubscription ? this.reporterHostTeamSubscription.unsubscribe() : null;
    this.routeParamsSubscription ? this.routeParamsSubscription.unsubscribe() : null;
    this.reporterSubscription ? this.reporterSubscription.unsubscribe() : null;
    this.routerSubscription ? this.routerSubscription.unsubscribe() : null;
    this.dialogRefSubscription ? this.dialogRefSubscription.unsubscribe() : null;
  }
  loadPageData(result) {
    this.hostName = result.host.hostName;
    this.reporterName = `${result.reporter.fname} ${result.reporter.lname}`;
    this.activeTeamName = result.reporter.activeTeamName;
    this.reporterId = result.reporter._id;
    this.reporter = result.reporter;
    this.host = result.host;
    const hostTeams = _.filter(result.teams, (t) => {
      const isMember = _.find(result.reporter.teamMembers, (tm) => {
        return tm._team === t._id;
      });
      if (!isMember) {
        return t;
      }
    });
    this.hostTeamTableData = Observable.create((observer) => {
      observer.next(hostTeams);
      observer.complete();
    });
    const membership = result.reporter.teamMembers.map((tm) => {
      const filteredTeam = _.find(result.teams, (t) => {
        return t._id === tm._team;
      });
      const checkIfLeader = _.find(result.reporter.teamLeaders, (tl) => {
        return tl._team === tm._team;
      });
      return {...filteredTeam, role: checkIfLeader ? 'Leader' : 'Member', _reporter: tm._user};
    });
    this.reporterTeamTableData = Observable.create((observer) => {
      observer.next(membership);
      observer.complete();
    });
  }

  onBack() {
    this.router.navigate([this.routingState.getPreviousUrl()]);
  }
  onJoinTeam (data) {
    const newData = {...data, action: 'join', _reporter: this.reporterId};
    this.TeamActions(newData);
  }
  reporterTeamOptions (data) {
    this.dialogRef = this.dialog.open(ReporterTeamOptionDialogComponent, {
      width: '500px',
      data: data
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed()
    .subscribe(
      result => {
        if (result) {
          this.isLoading = true;
          const data = JSON.parse(result);
          this.TeamActions(data);
        }
      }
    );
  }

  onCreateTeam () {
    this.dialogRef = this.dialog.open(AddTeamDialogComponent, {
      width: '500px',
      data: {host: this.host, reporter: this.reporter }
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed()
    .subscribe(
      result => {
        if (result) {
          const data = JSON.parse(result);
          if (typeof(result) === 'string') {
            this.isLoading = false;
            swal('Team Creation Error', result, 'warning');
          } else {
            window.location.reload();
          }
        }
      }
    );
  }

  TeamActions (data) {
    this.isLoading = true;
    switch (data.action) {
      case 'setmember': {
        this.isLoading = true;
        this.teamActionCreator.SetAsTeamMember(data._reporter, data._id, (err, team) => {
          if (err) {
            this.isLoading = false;
            swal('Team Option', err, 'warning');
          }
          if (team) {
            window.location.reload();
          }
        });
      }
      break;
      case 'setleader': {
        this.isLoading = true;
        this.teamActionCreator.SetAsTeamLeader(data._reporter, data._id, (err, team) => {
          if (err) {
            this.isLoading = false;
            swal('Team Option', err, 'warning');
          }
          if (team) {
            window.location.reload();
          }
        });
      }
      break;
      case 'setactive': {
        this.isLoading = true;
        this.teamActionCreator.SetActiveTeam(data._reporter, data._id, (err, team) => {
          if (err) {
            this.isLoading = false;
            swal('Team Option', err, 'warning');
          }
          if (team) {
            window.location.reload();
          }
        });
      }
      break;
      case 'join': {
        this.isLoading = true;
        this.teamActionCreator.JoinTeam(data._reporter, data._id, (err, team) => {
          if (err) {
            this.isLoading = false;
            swal('Team Option', err, 'warning');
          }
          if (team) {
            window.location.reload();
          }
        });
      }
      break;
      case 'unjoin': {
        this.isLoading = true;
        this.teamActionCreator.UnJoinTeam(data._reporter, data._id, (err, team) => {
          if (err) {
            this.isLoading = false;
            swal('Team Option', err, 'warning');
          }
          if (team) {
            window.location.reload();
          }
        });
      }
      break;
      default:
        this.isLoading = false;
    }
  }
}
