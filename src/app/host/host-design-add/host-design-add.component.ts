import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

export class HostDesignAddComponent implements OnInit, OnDestroy {

  public hostId: string;
  public hostDesignForm: FormGroup;
  private routeParamsSubscription: Subscription = null;
  private hostDesignSubscription: Subscription = null;
  private designErrorSubscription: Subscription = null;
  public errorText: string = null;
  public successText: string = null;
  @select(s => s.design.error) designStoreError;
  @select(s => s.host.selectedHost) selectedHost;

  constructor(
    private actvatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private designActionCreator: DesignActionCreator
  ) { }

  ngOnInit() {

      this.routeParamsSubscription = this.actvatedRoute.params
          .subscribe(
          params => {
              this.hostId = params._hostId
          }
          );

    this.hostDesignSubscription = this.selectedHost
        .subscribe(
        hostDesign => {
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

  ngOnDestroy() {
    (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
    (this.hostDesignSubscription) ? this.hostDesignSubscription.unsubscribe() : null;
    (this.designErrorSubscription) ? this.designErrorSubscription.unsubscribe() : null;
  }

  onColorOneEvent(value: string) {
    this.hostDesignForm.value.colorOne = value;
  }

  onColorTwoEvent(value: string) {
    this.hostDesignForm.value.colorTwo = value;
  }

  onColorThreeEvent(value: string) {
    this.hostDesignForm.value.colorThree = value;
  }

  onBack() {
      this.router.navigate([`admin/host-design/${this.hostId}`]);
  }

  onAdd() {
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
