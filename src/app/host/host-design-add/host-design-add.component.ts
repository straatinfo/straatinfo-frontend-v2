import { Component, OnInit, OnDestroy, OnChanges, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { DesignActionCreator } from '../../store/action-creators';
import { IDesign } from 'app/interface/design/design.interface';

import { BACKEND_URL } from '../../config';

@Component({
  selector: 'app-host-design-add',
  templateUrl: './host-design-add.component.html',
  styleUrls: ['./host-design-add.component.scss']
})

export class HostDesignAddComponent implements OnInit, OnDestroy, CanDeactivate<HostDesignAddComponent> {

  public hostId: string;
  public hostDesignForm: FormGroup;
  private routeParamsSubscription: Subscription = null;
  private hostDesignSubscription: Subscription = null;
  private designErrorSubscription: Subscription = null;
  public errorText: string = null;
  public successText: string = null;
  public isDirty: boolean = false;
  @select(s => s.design.error) designStoreError;
  @select(s => s.host.selectedHost) selectedHost;

  constructor(
    private actvatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private designActionCreator: DesignActionCreator
  ) { }

  

  ngOnInit() {
    this.hostDesignSubscription = this.selectedHost
        .subscribe(
        design => {
            this.hostId = design._id;
            this.hostDesignForm = this.formBuilder.group({
                designName: [null, Validators.required],
                colorOne: [null, Validators.required],
                colorTwo: [null, Validators.required],
                colorThree: [null, Validators.required],
                secure_url: [null, Validators.required],
            });
        }
        );
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (this.isDirty) {
      return swal({
        title: 'Do you want to discard changes?',
        text: 'Please click Add design to save changes',
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
    (this.hostDesignSubscription) ? this.hostDesignSubscription.unsubscribe() : null;
    (this.designErrorSubscription) ? this.designErrorSubscription.unsubscribe() : null;
  }

  setToDirty () {
		this.isDirty = true;
	}

  onColorOneEvent(value: string) {
    // this.hostDesignForm.value.colorOne = value;
    this.hostDesignForm.patchValue({
      colorOne: value
    });
    this.isDirty = true;
  }

  onColorTwoEvent(value: string) {
    this.hostDesignForm.patchValue({
      colorTwo: value
    });
    this.isDirty = true;
  }

  onColorThreeEvent(value: string) {
    this.hostDesignForm.patchValue({
      colorThree: value
    });
    this.isDirty = true;
  }

  onBack() {
      this.router.navigate([`admin/host/design/${this.hostId}`]);
  }

  onAdd() {
    this.isDirty = false;
    this.errorText = null;
    this.successText = null;
    this.designActionCreator.CreateDesign(this.hostId, this.hostDesignForm.value);
    this.designErrorSubscription = this.designStoreError.subscribe(
        error => {
            if (error) {
                console.log(error);
                this.errorText = error;
            } else {
                this.hostDesignForm.reset();
                this.successText = 'Design has been added.';
            }
        }
    );
  }
}
