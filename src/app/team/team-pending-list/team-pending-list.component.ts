import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { TeamActionCreator } from '../../store/action-creators';

@Component({
  selector: 'app-team-pending-list',
  templateUrl: './team-pending-list.component.html',
  styleUrls: ['./team-pending-list.component.scss']
})
export class TeamPendingListComponent implements OnInit {

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

  onActionApprove (data) {
    if (data._id) {
      this.teamActionCreator.ApproveTeam(data._id);
    }
  }

  onActionDecline (data) {
    if (data._id) {
      this.teamActionCreator.DeclineTeam(data._id);
    }
  }

}
