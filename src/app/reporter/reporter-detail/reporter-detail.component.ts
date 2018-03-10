import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ReporterActionCreator, TeamActionCreator } from '../../store/action-creators';
import { IReporter } from 'app/interface/reporter/reporter.interface';

@Component({
    selector: 'app-reporter-detail',
    templateUrl: './reporter-detail.component.html',
    styleUrls: ['./reporter-detail.component.scss']
})

export class ReporterDetailComponent implements OnInit, OnDestroy {

    public reporterDetailForm: FormGroup;
    private routeParamsSubscription: Subscription = null;
    private reporterSubscription: Subscription = null;    
    private reporterErrorSubscription: Subscription = null;
    private teamSubscription: Subscription = null;
    private teamErrorSubscription: Subscription = null;
    public errorText: string = null;
    public successText: string = null;

    private teamId: string;
    private userId: string;

    @select(s => s.reporter.error) reporterStoreError;
    @select(s => s.team.error) teamStoreError;
    @select(s => s.reporter.selectedReporter) selectedReporter;

    constructor(
        private actvatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private reporterActionCreator: ReporterActionCreator,
        private teamActionCreator: TeamActionCreator
    ) { }

    ngOnInit() {
        this.routeParamsSubscription = this.actvatedRoute.params
            .subscribe(
            params => {
                this.reporterActionCreator.SelectReporter(params._id);
                this.reporterSubscription = this.selectedReporter
                    .subscribe(
                    report => {
                        this.teamId = report.activeTeamId;
                        this.userId = report._id;
                        this.reporterDetailForm = this.formBuilder.group({                            
                            _id: [report._id, Validators.required],
                            isVolunteer: [{ value: report.isVolunteer, disabled: true }, Validators.required],
                            fname: [{ value: report.fname, disabled: true }, Validators.required],
                            lname: [{ value: report.lname, disabled: true }, Validators.required],
                            gender: [{ value: report.gender, disabled: true }, Validators.required],
                            streetName: [{ value: report.streetName, disabled: true }, Validators.required],
                            postalCode: [{ value: report.postalCode, disabled: true }, Validators.required],
                            city: [{ value: report.city, disabled: true }, Validators.required],
                            email: [{ value: report.email, disabled: true }, Validators.required],
                            phoneNumber: [{ value: report.phoneNumber, disabled: true }, Validators.required],
                            chatName: [{ value: report.chatName, disabled: true }, Validators.required],                                                        
                            hostName: [{ value: report.hostName, disabled: true }, Validators.required],
                            activeTeamName: [{ value: report.activeTeamName, disabled: true }, Validators.required],
                            activeTeamEmail: [{ value: report.activeTeamEmail, disabled: true }, Validators.required],
                            status1: [{ value: report.status1, disabled: true }, Validators.required],
                            status2: [{ value: report.status2, disabled: true }, Validators.required],
                            dateRegistrationReporter: [{ value: report.dateRegistrationReporter, disabled: true }, Validators.required],
                            dateCreationTeam: [{ value: report.dateCreationTeam, disabled: true }, Validators.required],
                        });
                    }
                    );
            }
            );
    }

    ngOnDestroy() {
        (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
        (this.reporterSubscription) ? this.reporterSubscription.unsubscribe() : null;
        (this.reporterErrorSubscription) ? this.reporterErrorSubscription.unsubscribe() : null;
        (this.teamSubscription) ? this.teamSubscription.unsubscribe() : null;
        (this.teamErrorSubscription) ? this.teamErrorSubscription.unsubscribe() : null;
    }

    onBlock() {
        this.errorText = null;
        this.successText = null;
        this.reporterActionCreator.BlockReporter(this.reporterDetailForm.value._id);
        this.reporterErrorSubscription = this.reporterStoreError.subscribe(
            error => {
                if (error) {
                    this.errorText = error;
                } else {
                    this.successText = 'The Reporter has been block.';
                    this.reporterDetailForm.patchValue({ status1: 'BLOCK' });
                }
            }
        );
    }

    onUnblock() {
        this.errorText = null;
        this.successText = null;
        this.reporterActionCreator.UnblockReporter(this.reporterDetailForm.value._id);
        this.reporterErrorSubscription = this.reporterStoreError.subscribe(
            error => {
                if (error) {
                    this.errorText = error;
                } else {
                    this.successText = 'The Reporter has been unblock.';
                    this.reporterDetailForm.patchValue({ status1: 'ACTIVE' });
                }
            }
        );
    }

    onTeamLeader() {
        this.errorText = null;
        this.successText = null;

        if (this.teamId != null) {
            this.teamActionCreator.SetAsTeamLeader(this.userId, this.teamId);
            this.teamErrorSubscription = this.teamStoreError.subscribe(
                error => {
                    if (error) {
                        console.log(error);
                        this.errorText = error;
                    } else {
                        this.successText = 'The Reporter has been set as team leader';
                        this.reporterDetailForm.patchValue({ status2: 'LEADER' });
                    }
                }
            );
        }
    }

    onTeamMember() {
        this.errorText = null;
        this.successText = null;

        if (this.teamId != null) {
            this.teamActionCreator.SetAsTeamMember(this.userId, this.teamId);
            this.teamErrorSubscription = this.teamStoreError.subscribe(
                error => {
                    if (error) {
                        console.log(error);
                        this.errorText = error;
                    } else {
                        this.successText = 'The Reporter has been set as team member';
                        this.reporterDetailForm.patchValue({ status2: 'MEMBER' });
                    }
                }
            );
        }
    }

    onTeam() {
        this.router.navigate([`admin/reporter/team/${this.reporterDetailForm.value._id}`]);
    }

    onDelete() {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result) {
                this.reporterActionCreator.DeleteReporter(this.reporterDetailForm.value._id, this.reporterDetailForm.value);
                swal(
                    'Deleted!',
                    `${this.reporterDetailForm.getRawValue().chatName} has been deleted.`,
                    'success'
                );
            }
        }).then(() => {
            this.router.navigate(['admin/reporter']);
        });

    }

    onBack() {
        this.router.navigate([`admin/reporter`]);
    }
}