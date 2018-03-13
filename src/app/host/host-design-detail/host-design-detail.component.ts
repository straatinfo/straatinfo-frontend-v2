import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { select, NgRedux } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { DesignActionCreator } from '../../store/action-creators';
import { IDesign } from 'app/interface/design/design.interface';

import { BACKEND_URL } from '../../config';
import { IDesignView } from '../../interface/design/design-view.interface';
import { IAppState } from '../../store/app.store';
import { DESIGN_UPDATE_FULFILLED, DESIGN_UPDATE_FAILED, DESIGN_SELECT_FULFILLED } from '../../store/actions/design.action';

@Component({
	selector: 'app-host-design-detail',
	templateUrl: './host-design-detail.component.html',
	styleUrls: ['./host-design-detail.component.scss']
})

export class HostDesignDetailComponent implements OnInit ,DoCheck ,OnDestroy {

	public uploadUrl: string;
	public hostId: string;
	public hostDesignForm: FormGroup;
	private routeParamsSubscription: Subscription = null;
	private designSubscription: Subscription = null;
	private designErrorSubscription: Subscription = null;
	public errorText: string = null;
	public successText: string = null;
	// variables to check
	public designData: IDesignView = null
	public loadDesignData: boolean = false;
	public errorMessage: string = null;
	public successMessage: string = null;

	@select(s => s.design.error) designStoreError: Observable<string>;
	@select(s => s.design.selectedDesign) selectedDesign: Observable<IDesignView>;
	@select(s => s.design.spinner) designSpinner: Observable<boolean>;
	@select(s => s.misc.spinner) miscSpinner: Observable<boolean>;
	constructor(
		private actvatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private router: Router,
		private designActionCreator: DesignActionCreator,
		private ngRedux: NgRedux<IAppState>
	) {
	
	}

	ngOnInit() {

		this.routeParamsSubscription = this.actvatedRoute.params
			.subscribe(
				params => {
					this.uploadUrl = `${BACKEND_URL}/v1/api/design/${params._id}?flat=true`;
					this.designActionCreator.SelectDesign(params._id);
					this.designSubscription = this.selectedDesign
						.subscribe(
							(design: IDesignView) => {
								this.hostId = (design) ? design._host: null;
								this.designData = design;
								this.loadDesignData = true;
							}
						);
				}
			);
	}

	ngDoCheck() {
		if (this.designData && this.loadDesignData) this.onLoadDesignForm(this.designData);
		if (this.successMessage) this.onSuccessMessage(this.successMessage);
		if (this.errorMessage) this.onErrorMessage(this.errorMessage);
	}

	ngOnDestroy() {
		(this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
		(this.designSubscription) ? this.designSubscription.unsubscribe() : null;
		(this.designErrorSubscription) ? this.designErrorSubscription.unsubscribe() : null;
	}

	onLoadDesignForm(design: IDesignView) {
		this.hostDesignForm = this.formBuilder.group({
			_id: [design._id, Validators.required],
			designName: [design.designName, Validators.required],
			colorOne: [design.colorOne, Validators.required],
			colorTwo: [design.colorTwo, Validators.required],
			colorThree: [design.colorThree, Validators.required],
			_profilePicSecureUrl: [design._profilePicSecureUrl, Validators.required],
		});
	}

	onColorOneEvent(value: string) {
		this.loadDesignData = false;
		// this.hostDesignForm.value.patch({ colorOne: value });
		this.hostDesignForm.value.colorOne = value;
	}

	onColorTwoEvent(value: string) {
		this.loadDesignData = false;
		// this.hostDesignForm.value.patch({ colorTwo: value });
		this.hostDesignForm.value.colorTwo = value;
	}

	onColorThreeEvent(value: string) {
		this.loadDesignData = false;
		// this.hostDesignForm.value.patch({ colorThree: value });
		this.hostDesignForm.value.colorThree = value;
	}

	onBack() {
		this.router.navigate([`admin/host/design/${this.hostId}`]);
	}

	onErrorMessage(error: string) {
		this.errorText = error;
		this.successText = null;
	}

	onSuccessMessage(success: string) {
		this.successText = success;
		this.errorText = null;
	}

	onUploadError(event) {
		this.ngRedux.dispatch({ type: DESIGN_UPDATE_FAILED, payload: event });
		this.ngOnInit();
	}

	onUploadSuccess(event) {
		this.ngRedux.dispatch({ type: DESIGN_UPDATE_FULFILLED, payload: event });
		this.ngRedux.dispatch({ type: DESIGN_SELECT_FULFILLED, payload: event });
		this.loadDesignData = true;
		this.ngOnInit();
	}

	onUpdate() {
		this.errorText = null;
		this.successText = null;
		this.designActionCreator.UpdateDesign(this.hostDesignForm.value._id, this.hostDesignForm.value);
		this.designErrorSubscription = this.designStoreError.subscribe(
			error => {
				if (error) {
					console.log(error);
					this.errorText = error;
				} else {
					this.successText = 'Design has been updated.';
				}
			}
		);
	}
}
