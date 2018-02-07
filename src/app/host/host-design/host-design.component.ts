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
        this.designActionCreator.GetDesignByHostId(params._hostId);
        this.hostDesignSubscription = this.selectedHost
        .subscribe(
          host => {
            this.hostDesignForm = this.formBuilder.group({
                _id: [host._id, Validators.required],
                colorOne: [host.colorOne, Validators.required],
                colorTwo: [host.colorTwo, Validators.required],
                colorThree: [host.colorThree, Validators.required],
                url: [host.url, Validators.required],
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

  onUpdate() {
      if (this.hostDesignForm.valid) {
          this.designActionCreator.UpdateDesign(this.hostDesignForm.value.id, this.hostDesignForm.value);
      }
  }

}
