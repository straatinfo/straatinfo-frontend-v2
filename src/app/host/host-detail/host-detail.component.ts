import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { HostActionCreator } from '../../store/action-creators';
import { IHost } from 'app/interface/host/host.interface';

@Component({
  selector: 'app-host-detail',
  templateUrl: './host-detail.component.html',
  styleUrls: ['./host-detail.component.scss']
})

export class HostDetailComponent implements OnInit, OnDestroy {

  public hostDetailForm: FormGroup;
  private routeParamsSubscription: Subscription = null;
  private hostSubscription: Subscription = null;
  @select(s => s.host.selectedHost) selectedHost;

  constructor(
    private actvatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private hostActionCreator: HostActionCreator
  ) { }

  ngOnInit() {
    this.routeParamsSubscription = this.actvatedRoute.params
    .subscribe(
      params => {
        this.hostActionCreator.SelectHost(params.id);
        this.hostSubscription = this.selectedHost
        .subscribe(
          host => {
            this.hostDetailForm = this.formBuilder.group({
              id: [host.id, Validators.required],
              hostName: [host.hostName, Validators.required],
              email: [host.email, [Validators.required, Validators.email]],
              username: [host.username, Validators.required],
              houseNumber: [host.houseNumber, Validators.required],
              streetName: [host.streetName, Validators.required],
              city: [host.city, Validators.required],
              state: [host.state, Validators.required],
              country: [host.country, Validators.required],
              postalCode: [host.postalCode, Validators.required],
              phoneNumber: [host.phoneNumber, Validators.required],
              long: [host.long, Validators.required],
              lat: [host.lat, Validators.required],
              isBlocked: [host.isBlocked]
            });
          }
        );
      }
    );
  }

  ngOnDestroy() {
    (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
    (this.hostSubscription) ? this.hostSubscription.unsubscribe() : null;
  }

  onViewReport() {
      this.router.navigate([`admin/host-report/${this.hostDetailForm.value.id}`]);
  }

  onViewReporter() {
      this.router.navigate([`admin/host-reporter/${this.hostDetailForm.value.id}`]);
  }

  onUpdate() {
      if (this.hostDetailForm.valid) {
          this.hostActionCreator.UpdateHost(this.hostDetailForm.value.id, this.hostDetailForm.value);
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
        this.hostActionCreator.DeleteHost(this.hostDetailForm.value.id, this.hostDetailForm.value);
        swal(
          'Deleted!',
          `${this.hostDetailForm.value.hostName} has been deleted.`,
          'success'
        );
      }
    }).then(() => {
      this.router.navigate(['admin/host']);
    });
  } 

}