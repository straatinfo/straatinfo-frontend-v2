import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ReporterActionCreator } from '../../store/action-creators';
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
    @select(s => s.reporter.selectedReporter) selectedReporter;

    constructor(
        private actvatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private reporterActionCreator: ReporterActionCreator
    ) { }

    ngOnInit() {
        this.routeParamsSubscription = this.actvatedRoute.params
            .subscribe(
            params => {
                this.reporterActionCreator.SelectReporter(params._id);
                this.reporterSubscription = this.selectedReporter
                    .subscribe(
                    report => {
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
    }

    onBlock() {
        if (this.reporterDetailForm.valid) {
            this.reporterActionCreator.BlockReporter(this.reporterDetailForm.value._id);
        }
    }

    onUnblock() {
        if (this.reporterDetailForm.valid) {
            this.reporterActionCreator.UnblockReporter(this.reporterDetailForm.value._id);
        }
    }
    onBack() {
        this.router.navigate([`admin/reporter`]);
    }
}
