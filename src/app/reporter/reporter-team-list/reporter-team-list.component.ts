import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { TeamActionCreator } from '../../store/action-creators';
import { DialogService } from '../../services';
import swal from 'sweetalert2';

@Component({
    selector: 'app-reporter-team-list',
    templateUrl: './reporter-team-list.component.html',
    styleUrls: ['./reporter-team-list.component.scss']
})
export class ReporterTeamListComponent implements OnInit {

  private routeParamsSubscription: Subscription = null;
  private reporterSubscription: Subscription = null;
  private teamErrorSubscription: Subscription = null;

  @select(s => s.team.error) teamStoreError;
  @select(s => s.team.teams) teams;
  @select(s => s.team.spinner) teamSpinner;
  @select(s => s.table.page) page;
  @select(s => s.reporter.selectedReporter) selectedReporter;

  public reporterName: string;
  public reporterId: string;
  public userId: string;
  public isVolunteer: boolean;

  public dataNames: string[] = [
      'teamName', 'teamEmail', 'isVolunteer'
  ];

  public dataAliases: string[] = [
      'Team', 'Email', 'Volunteer'
  ];

  constructor(
      private actvatedRoute: ActivatedRoute,
      private teamActionCreator: TeamActionCreator,
      private router: Router,
      private dialogService: DialogService
  ) {
  }

  ngOnInit() {
      this.routeParamsSubscription = this.actvatedRoute.params
        .subscribe(
          params => {
                this.reporterId = params._reporterId;
                this.teamActionCreator.GetTeams();
        });

      this.reporterSubscription = this.selectedReporter
          .subscribe(reporter => {  
              this.userId = reporter._id;
              this.isVolunteer = (typeof reporter.isVolunteer == 'string' && reporter.isVolunteer.toUpperCase() === 'VOLUNTEER') ? true
                                    : (reporter.isVolunteer === true) ? true : false;
              this.reporterName = reporter.fname + " " + reporter.lname;                  
        });
  }

  onBack() {
      this.router.navigate([`admin/reporter/${this.reporterId}`]);
  }

  onAdd() {
      this.router.navigate([`admin/reporter/add-team/${this.reporterId}`]);
  }

  onJoinClick(event) {
      if (event.isVolunteer == this.isVolunteer) {
        this.teamActionCreator.JoinTeam(this.userId, event._id, null);    
        this.teamErrorSubscription = this.teamStoreError.subscribe(
            error => {
                if (error) {
                    this.dialogService.showSwal('error-message', { title: 'Error', text: error });
                } else {
                    this.dialogService.showSwal('success-message', { title: 'Join Team', text: `Successfully joined team: ${event.teamName}` })
                }
            }
        ); 
      } else {
          const text = `${(this.isVolunteer == true) ? 'Volunteer' : 'Non-Volunteer'} Reporter can't join ${(event.isVolunteer == true) ? 'Volunteer' : 'Non-Volunteer'} team`;
          swal('Cannot Join Team', text, 'warning');
      }

  }
}
