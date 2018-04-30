
import { ITeam } from './../../interface/team/team.interface';
import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable, Observer } from 'rxjs';
import { mergeMap, flatMap } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';
import * as _ from 'lodash';

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
  public isLoading: boolean = false;
  public hostName: string;
  public reporterName: string;
  public activeTeamName: string;
  @select(s => s.reporter.selectedReporter) selectedReporter$: Observable<IReporterView>;
  @select(s => s.host.selectedHost) selectedHost$: Observable<IHostView>;
  @select(s => s.team.teams) teams$: Observable<ITeam[]>;

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
  constructor(
    private activatedRoute: ActivatedRoute,
    private teamActionCreator: TeamActionCreator,
    private router: Router,
    private reporterActionCreator: ReporterActionCreator,
    private hostActionCreator: HostActionCreator
  ) { }


  ngOnInit() {
    this.reporterActionCreator.ResetSelectedReporter();
    this.reporterHostTeamSubscription = this.reporterHostTeamObservable
      .subscribe(
        result => {
          if (result && result.host && result.reporter && result.teams) {
            this.loadPageData(result);
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
  }
  loadPageData(result) {
    this.hostName = result.host.hostName;
    this.reporterName = `${result.reporter.fname} ${result.reporter.lname}`;
    this.activeTeamName = result.reporter.activeTeamName;
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
  onJoinTeam (data) {
    console.log(data);
  }
  reporterTeamOptions (data) {
    console.log(data);
  }
}
