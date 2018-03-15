import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { TeamActionCreator } from '../../store/action-creators';
import { ITeamStore } from '../../store/team.store';

@Component({
  selector: 'app-reporter-team-pending-list',
  templateUrl: './reporter-team-pending-list.component.html',
  styleUrls: ['./reporter-team-pending-list.component.scss']
})
export class ReporterTeamPendingListComponent implements OnInit, OnDestroy {

  private routeParamsSubscription: Subscription = null;
  private reporterSubscription: Subscription = null;
  private teamErrorSubscription: Subscription = null;

  @select(s => s.team) team$: Observable<ITeamStore>;
  @select(s => s.team.pendingTeams) pendingTeams;
  @select(s => s.team.spinner) teamSpinner;
  @select(s => s.table.page) page;
  @select(s => s.reporter.selectedReporter) selectedReporter;

  public reporterName: string;
  public reporterId: string;
  public hostId: string;

  public dataNames: string[] = [
    'teamName', 'teamEmail', 'isVolunteer', '_hostName', 'isApproved'
  ];

  public dataAliases: string[] = [
    'Team Name', 'Team Email', 'Volunteer', 'Host Name', 'Approved'
  ];

  constructor(
    private actvatedRoute: ActivatedRoute,
    private teamActionCreator: TeamActionCreator,
    private router: Router
  ) { }

  ngOnInit() {

      this.routeParamsSubscription = this.actvatedRoute.params
          .subscribe(
          params => {
              this.reporterId = params._reporterId;                            
          });

      this.reporterSubscription = this.selectedReporter
          .subscribe(reporter => {
              this.hostId = reporter.hostId;
              this.reporterName = reporter.fname + " " + reporter.lname;
              this.teamActionCreator.GetReporterNonApprovedTeam(this.hostId);
          });
  }

  onBack() {
      this.router.navigate([`admin/reporter/${this.reporterId}`]);
  }

  ngOnDestroy() {
      (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
      (this.teamErrorSubscription) ? this.teamErrorSubscription.unsubscribe() : null;
  }

  onActionApprove (data) {
    if (data._id) {
        this.teamActionCreator.ReporterApproveTeam(data._id);
    }
  }

  onActionDecline (data) {
    if (data._id) {
        this.teamActionCreator.ReporterDeclineTeam(data._id);
    }
  }
}
