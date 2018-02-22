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
  private hostErrorSubscription: Subscription = null;
  public errorText: string = null;
  public successText: string = null;
  @select(s => s.host.error) hostStoreError;
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
        this.hostActionCreator.SelectHost(params._id);
        this.hostSubscription = this.selectedHost
        .subscribe(
            host => {
            this.hostDetailForm = this.formBuilder.group({
              _id: [host._id, Validators.required],
              hostName: [{ value: host.hostName, disabled: true }, Validators.required],
              email: [host.email, [Validators.required, Validators.email]],
              streetName: [host.streetName, Validators.required],
              city: [host.city, Validators.required],
              state: [host.state, Validators.required],
              country: [host.country, Validators.required],
              postalCode: [host.postalCode, Validators.required],
              phoneNumber: [host.phoneNumber, Validators.required],
              long: [host.long, Validators.required],
              lat: [host.lat, Validators.required],
              isBlocked: [host.isBlocked],
              fname: [host.fname, Validators.required],
              lname: [host.lname, Validators.required],
              hostPersonalEmail: [host.hostPersonalEmail, Validators.required],
            });
          }
        );
      }
      );
  }

  ngOnDestroy() {
    (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
    (this.hostSubscription) ? this.hostSubscription.unsubscribe() : null;
    (this.hostErrorSubscription) ? this.hostErrorSubscription.unsubscribe() : null;
  }

  onViewReport() {
      this.router.navigate([`admin/host/report/${this.hostDetailForm.value._id}`]);
  }

  onViewReporter() {
      this.router.navigate([`admin/host/reporter/${this.hostDetailForm.value._id}`]);
  }

  onDesign() {
      this.router.navigate([`admin/host/design/${this.hostDetailForm.value._id}`]);
  }

  onCategory() {
      this.router.navigate([`admin/host/category/${this.hostDetailForm.value._id}`]);
  }

  onUpdate() {
      this.errorText = null;
      this.successText = null;
      this.hostActionCreator.UpdateHost(this.hostDetailForm.value._id, this.hostDetailForm.value);
      this.hostErrorSubscription = this.hostStoreError.subscribe(
          error => {
              if (error) {
                  console.log(error);
                  this.errorText = error;
              } else {
                  this.successText = 'The Host has been updated.';
              }
          }
      );
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
        this.hostActionCreator.DeleteHost(this.hostDetailForm.value._id, this.hostDetailForm.value);
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
