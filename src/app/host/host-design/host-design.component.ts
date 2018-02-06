import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { HostDesignActionCreator } from '../../store/action-creators';
import { IHostDesign } from 'app/interface/host/host-design.interface';

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
    private hostDesignActionCreator: HostDesignActionCreator
  ) { }

  ngOnInit() {
    this.routeParamsSubscription = this.actvatedRoute.params
    .subscribe(
      params => {
        this.hostDesignActionCreator.SelectHostDesign(params._id);
        this.hostDesignSubscription = this.selectedHost
        .subscribe(
          host => {
            this.hostDesignForm = this.formBuilder.group({
                _id: [host._id, Validators.required],
                color1: [host.color1, Validators.required],
                color2: [host.color2, Validators.required],
                color3: [host.color3, Validators.required],
                logo: [host.logo, Validators.required],
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
          this.hostDesignActionCreator.UpdateHostDesign(this.hostDesignForm.value.id, this.hostDesignForm.value);
      }
  }

}
