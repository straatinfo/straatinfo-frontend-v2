import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { select, NgRedux } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { DesignActionCreator, HostActionCreator } from '../../store/action-creators';
import { IDesign } from 'app/interface/design/design.interface';
import { IDesignStore } from '../../store/design.store';

import { BACKEND_URL } from '../../config';
import { IDesignView } from '../../interface/design/design-view.interface';
import { IAppState } from '../../store/app.store';
import { DESIGN_UPDATE_FULFILLED, DESIGN_UPDATE_FAILED, DESIGN_SELECT_FULFILLED } from '../../store/actions/design.action';
import { IHostView } from '../../interface/host/host-view.interface';

@Component({
	selector: 'app-host-design-detail',
	templateUrl: './host-design-detail.component.html',
	styleUrls: ['./host-design-detail.component.scss']
})

export class HostDesignDetailComponent implements OnInit, DoCheck, OnDestroy, CanDeactivate<HostDesignDetailComponent> {

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
	private hostSubscription: Subscription = null;
	private isDirty: boolean = false;

	@select(s => s.design.error) designStoreError: Observable<string>;
	@select(s => s.design.selectedDesign) selectedDesign: Observable<IDesignView>;
	@select(s => s.design.spinner) designSpinner: Observable<boolean>;
	@select(s => s.misc.spinner) miscSpinner: Observable<boolean>;
	@select(s => s.design) design$: Observable<IDesignStore>;
	@select(s => s.host.selectedHostActiveDesign) activeDesign$: Observable<IDesignView>;
	@select(s => s.host.selectedHost) host$: Observable<IHostView>;
	@select(s => s.host.spinner) hostSpinner$: Observable<boolean>;

	constructor(
		private actvatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private router: Router,
		private designActionCreator: DesignActionCreator,
		private hostActionCreator: HostActionCreator,
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
								this.hostId = (design) ? design._host : null;
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

	canDeactivate(): Promise<boolean> | boolean {
    if (this.isDirty) {
      return swal({
        title: 'Do you want to discard changes?',
        text: 'Please click update design to save changes',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        return true;
      });
    }
    return true;
  }

	ngOnDestroy() {
		(this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
		(this.designSubscription) ? this.designSubscription.unsubscribe() : null;
		(this.designErrorSubscription) ? this.designErrorSubscription.unsubscribe() : null;
	}

	onLoadDesignForm(design: IDesignView) {
		this.hostDesignForm = this.formBuilder.group({
			_id: [design._id, Validators.required],
			_host: [design._host],
			designName: [design.designName, Validators.required],
			colorOne: [design.colorOne, Validators.required],
			colorTwo: [design.colorTwo, Validators.required],
			colorThree: [design.colorThree, Validators.required],
			_profilePicSecureUrl: [design._profilePicSecureUrl, Validators.required],
		});
		this.loadDesignData = false;
	}

	onColorOneEvent(value: string) {
		this.loadDesignData = false;
		// this.hostDesignForm.value.patch({ colorOne: value });
		this.hostDesignForm.value.colorOne = value;
		this.isDirty = true;
	}

	onColorTwoEvent(value: string) {
		this.loadDesignData = false;
		// this.hostDesignForm.value.patch({ colorTwo: value });
		this.hostDesignForm.value.colorTwo = value;
		this.isDirty = true;
	}

	onColorThreeEvent(value: string) {
		this.loadDesignData = false;
		// this.hostDesignForm.value.patch({ colorThree: value });
		this.hostDesignForm.value.colorThree = value;
		this.isDirty = true;
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

	setToDirty () {
		this.isDirty = true;
	}
	onUpdate() {
		this.isDirty = false;
		this.loadDesignData = true;
		this.errorText = null;
		this.successText = null;
		this.designActionCreator.UpdateDesign(this.hostDesignForm.value._id, this.hostDesignForm.value);
		this.designErrorSubscription = this.design$
			.subscribe(
				(design: IDesignStore) => {
					if (design.error) this.errorMessage = design.error;
					if (design.success) this.successMessage = design.success;
				}
			);
	}
	onSetAsActive() {
		this.hostActionCreator.SetActiveDesign(this.hostDesignForm.value._id, this.hostDesignForm.value._host, false);
	}
}
