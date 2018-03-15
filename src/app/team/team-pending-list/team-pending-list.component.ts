import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { TeamActionCreator } from '../../store/action-creators';
import { ITeamStore } from '../../store/team.store';

@Component({
  selector: 'app-team-pending-list',
  templateUrl: './team-pending-list.component.html',
  styleUrls: ['./team-pending-list.component.scss']
})
export class TeamPendingListComponent implements OnInit, OnDestroy {

  private teamErrorSubscription: Subscription = null;

  @select(s => s.team) team$: Observable<ITeamStore>;
  @select(s => s.team.pendingTeams) pendingTeams;
  @select(s => s.team.spinner) teamSpinner;
  @select(s => s.table.page) page;

  public dataNames: string[] = [
    'teamName', 'teamEmail', 'isVolunteer', '_hostName', 'isApproved'
  ];

  public dataAliases: string[] = [
    'Team Name', 'Team Email', 'Volunteer', 'Host Name', 'Approved'
  ];

  constructor(
    private teamActionCreator: TeamActionCreator
  ) { }

  ngOnInit() {
    this.teamActionCreator.GetNonApprovedTeam();
  }

  ngOnDestroy() {
      (this.teamErrorSubscription) ? this.teamErrorSubscription.unsubscribe() : null;
  }

  onActionApprove(data) {
      if (data._id) {
          this.teamActionCreator.ApproveTeam(data._id);
      }
  }

  onActionDecline(data) {
      if (data._id) {
          this.teamActionCreator.DeclineTeam(data._id);
      }
  }
}
