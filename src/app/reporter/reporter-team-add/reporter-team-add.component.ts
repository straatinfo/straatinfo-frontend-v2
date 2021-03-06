import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';

import { TeamActionCreator } from '../../store/action-creators';

@Component({
    selector: 'app-reporter-team-add',
    templateUrl: './reporter-team-add.component.html',
    styleUrls: ['./reporter-team-add.component.scss']
})
export class ReporterTeamAddComponent implements OnInit, OnDestroy {

    public addTeamForm: FormGroup;
    private routeParamsSubscription: Subscription = null;
    private reporterSubscription: Subscription = null;
    private teamErrorSubscription: Subscription = null;
    public errorText: string = null;
    public successText: string = null;

    public reporterName: string;
    public reporterId: string;
    public reporterHostId: string;

    @select(s => s.team.error) teamStoreError;
    @select(s => s.reporter.selectedReporter) selectedReporter;

    constructor(
        private actvatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
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
                this.reporterName = reporter.fname + " " + reporter.lname;
                this.reporterHostId = reporter.hostId;

                this.addTeamForm = this.formBuilder.group({
                    _id: [null, Validators.required],
                    teamName: [null, Validators.required],
                    teamEmail: [null, [Validators.required, Validators.email]],
                    isVolunteer: [true, Validators.required],
                    _host: [reporter.hostId, Validators.required],
                });
            });
    }

    ngOnDestroy() {
        (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
        (this.teamErrorSubscription) ? this.teamErrorSubscription.unsubscribe() : null;
    }

    onSubmit() {
        this.errorText = null;
        this.successText = null;
        this.addTeamForm.value._host = this.reporterHostId;
        if (this.addTeamForm.value.isVolunteer == null)
            this.addTeamForm.value.isVolunteer = true;
        this.teamActionCreator.CreateTeam(this.reporterId, this.reporterHostId, this.addTeamForm.value, null);
        this.teamErrorSubscription = this.teamStoreError.subscribe(
            error => {
                if (error) {
                    console.log(error);
                    this.errorText = error;
                } else {
                    this.addTeamForm.reset();
                    this.successText = 'The team has been added.';
                    this.router.navigate([`admin/reporter/team/${this.reporterId}`]);
                }
            }
        );
    }
    onReset() {
        this.addTeamForm.reset();
    }

    onBack() {
        this.router.navigate([`admin/reporter/team/${this.reporterId}`]);
    }
}
