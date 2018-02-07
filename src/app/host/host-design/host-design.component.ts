import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { DesignActionCreator } from '../../store/action-creators';
import { IDesign } from 'app/interface/design/design.interface';

@Component({
  selector: 'app-host-design',
  templateUrl: './host-design.component.html',
  styleUrls: ['./host-design.component.scss']
})

export class HostDesignComponent implements OnInit, OnDestroy {

  public hostDesignForm: FormGroup;
  private routeParamsSubscription: Subscription = null;
  private hostDesignSubscription: Subscription = null;
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
        this.designActionCreator.SelectDesign(params._id);
        this.hostDesignSubscription = this.selectedHost
        .subscribe(
          hostDesign => {
            this.hostDesignForm = this.formBuilder.group({
                _id: [hostDesign._id, Validators.required],
                colorOne: [hostDesign.colorOne, Validators.required],
                colorTwo: [hostDesign.colorTwo, Validators.required],
                colorThree: [hostDesign.colorThree, Validators.required],
                url: [hostDesign.url, Validators.required],
            });
          }
        );
      }
      );
  }

  ngOnDestroy() {
    (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
    (this.hostDesignSubscription) ? this.hostDesignSubscription.unsubscribe() : null;
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

  onUpdate() {
      if (this.hostDesignForm.valid) {
          this.designActionCreator.UpdateDesign(this.hostDesignForm.value._id, this.hostDesignForm.value);
      }
  }

}
