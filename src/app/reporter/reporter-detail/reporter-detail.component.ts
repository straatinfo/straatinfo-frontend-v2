import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ReporterActionCreator, TeamActionCreator } from '../../store/action-creators';
import { IReporter } from 'app/interface/reporter/reporter.interface';
import { IReporterView } from 'app/interface/reporter/reporter-view.interface';
import { IReporterStore } from '../../store/reporter.store';
import { ITeamStore } from '../../store/team.store';

@Component({
	selector: 'app-reporter-detail',
	templateUrl: './reporter-detail.component.html',
	styleUrls: ['./reporter-detail.component.scss']
})

export class ReporterDetailComponent implements OnInit, DoCheck, OnDestroy {

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

	// variables to check
	public reporterData: IReporterView = null
	public loadReporterData: boolean = false;
	public errorMessage: string = null;
	public successMessage: string = null;
	public pendingTeamId: string = null;
    public isVolunteer: boolean;
    public isTeamLeader: boolean = false;
    public isBlock: boolean = false;

	@select(s => s.reporter.error) reporterStoreError;
	@select(s => s.team.error) teamStoreError;
	@select(s => s.reporter.selectedReporter) selectedReporter;
	@select(s => s.reporter) reporter$: Observable<IReporterStore>;
	@select(s => s.reporter.spinner) reporterSpinner: Observable<boolean>;
	@select(s => s.team) team$: Observable<ITeamStore>;
	@select(s => s.team.spinner) teamSpinner: Observable<boolean>;

	constructor(
		private actvatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private router: Router,
		private reporterActionCreator: ReporterActionCreator,
		private teamActionCreator: TeamActionCreator
	) { }

	ngOnInit() {
		this.reporterActionCreator.ResetSelectedReporter();
		this.routeParamsSubscription = this.actvatedRoute.params
			.subscribe(
				params => {
					this.reporterActionCreator.SelectReporter(params._id);
					this.reporterSubscription = this.selectedReporter
						.subscribe(
							(report: IReporterView) => {
								this.teamId = (report) ? report.activeTeamId : null;
								this.userId = (report) ? report._id : null;
								this.reporterData = report;
								this.loadReporterData = true;
							}
						);
				}
			);
	}

	ngDoCheck() {
		if (this.reporterData && this.loadReporterData) this.onLoadForm(this.reporterData);
		if (this.successMessage) this.onSuccessMessage(this.successMessage);
		if (this.errorMessage) this.onErrorMessage(this.errorMessage);
	}

	ngOnDestroy() {
		(this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
		(this.reporterSubscription) ? this.reporterSubscription.unsubscribe() : null;
		(this.reporterErrorSubscription) ? this.reporterErrorSubscription.unsubscribe() : null;
		(this.teamSubscription) ? this.teamSubscription.unsubscribe() : null;
		(this.teamErrorSubscription) ? this.teamErrorSubscription.unsubscribe() : null;
	}

	onLoadForm(report: IReporterView) {
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

		this.pendingTeamId = report.pendingTeam;
        this.loadReporterData = false;
        this.isVolunteer = report.isVolunteer.toLowerCase() === 'volunteer';
        this.isTeamLeader = report.status2.toLowerCase() === 'leader';
        this.isBlock = report.status1.toLowerCase() === 'block';
	}

	onErrorMessage(error: string) {
		this.errorText = error;
		this.successText = null;
	}

	onSuccessMessage(success: string) {
		this.successText = success;
		this.errorText = null;
	}

	onBlock() {
		this.loadReporterData = false;
		this.errorText = null;
		this.successText = null;
		this.reporterActionCreator.BlockReporter(this.reporterDetailForm.value._id);
		this.reporterErrorSubscription = this.reporter$
			.subscribe(
				(reporter: IReporterStore) => {
					if (reporter.error) this.errorMessage = reporter.error;
					if (reporter.success) {
						this.successMessage = reporter.success;
						this.reporterDetailForm.patchValue({ status1: 'BLOCK' });
					}
				}
        );

        this.isBlock = true;
	}

	onUnblock() {
        this.loadReporterData = false;
		this.errorText = null;
		this.successText = null;
		this.reporterActionCreator.UnblockReporter(this.reporterDetailForm.value._id);
		this.reporterErrorSubscription = this.reporter$
			.subscribe(
				(reporter: IReporterStore) => {
					if (reporter.error) this.errorMessage = reporter.error;
					if (reporter.success) {
						this.successMessage = reporter.success;
						this.reporterDetailForm.patchValue({ status1: 'ACTIVE' });
					}
				}
        );

        this.isBlock = false;
	}

	onTeamLeader() {
		this.loadReporterData = true;
		this.errorText = null;
		this.successText = null;

		if (this.teamId != null) {
			this.teamActionCreator.SetAsTeamLeader(this.userId, this.teamId);
			this.teamErrorSubscription = this.team$
				.subscribe(
					(team: ITeamStore) => {
						if (team.error) this.errorMessage = team.error;
						if (team.success) {
							this.successMessage = team.success;
							this.reporterDetailForm.patchValue({ status2: 'LEADER' });
						}
					}
				);
		}
	}

	onTeamMember() {
		this.loadReporterData = true;
		this.errorText = null;
		this.successText = null;

		if (this.teamId != null) {
			this.teamActionCreator.SetAsTeamMember(this.userId, this.teamId);
			this.teamErrorSubscription = this.team$
				.subscribe(
					(team: ITeamStore) => {
						if (team.error) this.errorMessage = team.error;
						if (team.success) {
							this.successMessage = team.success;
							this.reporterDetailForm.patchValue({ status2: 'MEMBER' });
						}
					}
				);
		}
	}

	onTeam() {
		this.router.navigate([`admin/reporter/team/${this.reporterDetailForm.value._id}`]);
	}

	onTeamPending() {
		if (this.pendingTeamId) {
			this.teamActionCreator.ApproveTeam(this.pendingTeamId);
			this.ngOnInit();
		}
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
		this.actvatedRoute.params
			.subscribe(
				params => {
					if (params._hostId) {
						this.router.navigate([`admin/host/reporter/${params._hostId}`]);
					} else {
						this.router.navigate([`admin/reporter`]);
					}
				}
			);
	}
}
