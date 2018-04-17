import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { select, ObservableStore } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { HostActionCreator } from '../../store/action-creators';
import { IHost } from 'app/interface/host/host.interface';
import { IHostView } from '../../interface/host/host-view.interface';
import { IHostStore } from '../../store/host.store';



@Component({
  selector: 'app-host-detail',
  templateUrl: './host-detail.component.html',
  styleUrls: ['./host-detail.component.scss']
})

export class HostDetailComponent implements OnInit, DoCheck, OnDestroy, CanDeactivate<HostDetailComponent> {

  public hostDetailForm: FormGroup;
  private routeParamsSubscription: Subscription = null;
  private hostSubscription: Subscription = null;
  private hostErrorSubscription: Subscription = null;
  private hostStoreSubscription: Subscription = null;
  public errorText: string = null;
  public errorMessage: string = null;
  public successMessage: string = null;
  public successText: string = null;
  public isSpecific: boolean;
  public hostData: IHostView = null;
  public loadHostData: boolean = false;
  private isDirty: boolean = false;
  @select(s => s.host.error) hostStoreError;
  @select(s => s.host.selectedHost) selectedHost;
  @select(s => s.host) host$: Observable<IHostStore>;
  constructor(
    private actvatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private hostActionCreator: HostActionCreator
  ) {

  }

  ngOnInit() {
    this.routeParamsSubscription = this.actvatedRoute.params
    .subscribe(
      params => {
        this.hostActionCreator.SelectHost(params._id);
        this.hostSubscription = this.selectedHost
        .subscribe(
          (host: IHostView) => { 
            this.loadHostData = true;
            this.hostData = host;
            this.isSpecific = (host) ? host.isSpecific : null;
            if (host) { this.hostActionCreator.GetActiveDesign(host._activeDesign); }
          }
        );
      }
    );
  }

  ngDoCheck() {
    if (this.hostData && this.loadHostData) this.onLoadForm(this.hostData);
    if (this.errorMessage) this.onErrorMessage(this.errorMessage);
    if (this.successMessage) this.onSuccessMessage(this.successMessage);
    if (this.isSpecific && this.hostDetailForm) {
      this.hostDetailForm.patchValue({ design: 'CUSTOM' });
    } else if (!this.isSpecific && this.hostDetailForm) {
      this.hostDetailForm.patchValue({ design: 'GENERAL' });
    }
  }

  ngOnDestroy() {
    (this.routeParamsSubscription) ? this.routeParamsSubscription.unsubscribe() : null;
    (this.hostSubscription) ? this.hostSubscription.unsubscribe() : null;
    (this.hostErrorSubscription) ? this.hostErrorSubscription.unsubscribe() : null;
    (this.hostStoreSubscription) ? this.hostStoreSubscription.unsubscribe() : null;
  }

  setToDirty() {
    this.isDirty = true;
  }
  canDeactivate(): Promise<boolean> | boolean {
    if (this.isDirty) {
      return swal({
        title: 'Do you want to discard changes?',
        text: 'Please click update to save changes',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        return true;
      });
    }
    return true;
  }

  onLoadForm (host: IHostView) {
    this.hostDetailForm = this.formBuilder.group({
      _id: [host._id, Validators.required],
      hostName: [{ value: host.hostName, disabled: true }, Validators.required],
      email: [host.email, [Validators.required, Validators.email]],
      designType: [{ value: host.designType, disabled: true }, Validators.required],
      design: [{ value: host.design, disabled: true }],
      houseNumber: [host.houseNumber, Validators.required],
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
      isSpecific: [host.isSpecific]
      });
    this.loadHostData = false;
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

  onBack() {
      this.router.navigate([`admin/host`]);
  }

  onUpdate() {
      this.isDirty = false;
      this.loadHostData = true;
      this.errorText = null;
      this.successText = null;
      this.hostActionCreator.UpdateHost(this.hostDetailForm.value._id, this.hostDetailForm.value);
      this.hostStoreSubscription = this.host$
      .subscribe(
        (host: IHostStore) => {
          if (host.error) this.errorMessage = host.error;
          if (host.success) this.successMessage = host.success;
        }
      );
      // this.hostErrorSubscription = this.hostStoreError.subscribe(
      //     error => {
      //         if (error) {
      //             console.log(error);
      //             this.errorText = error;
      //         } else {
      //             this.successText = 'The Host has been updated.';
      //         }
      //     }
      // );
  }

  onSpecific() {
    this.loadHostData = false;
    this.hostActionCreator.UpdateHostDesign(this.hostDetailForm.value._id, true);
    this.hostStoreSubscription = this.host$
    .subscribe(
      (host: IHostStore) => {
        if (host.error) this.errorMessage = host.error;
        if (host.success) {
          this.successMessage = host.success
          this.isSpecific = true;
        };
      }
    );
    // this.hostStoreError.subscribe(
    //   error => {
    //     if (error !== '' ) {
    //       this.isSpecific = false;
    //       this.hostDetailForm.patchValue({ design: 'GENERAL' });
    //     } else {
    //       this.isSpecific = true;
    //       this.hostDetailForm.patchValue({ design: 'CUSTOM' });
    //     }
    //   }
    // );
  }

  onGeneral() {
    this.loadHostData = false;
    this.hostActionCreator.UpdateHostDesign(this.hostDetailForm.value._id, false);
    this.hostStoreSubscription = this.host$
    .subscribe(
      (host: IHostStore) => {
        if (host.error) this.errorMessage = host.error;
        if (host.success) {
          this.successMessage = host.success;
          this.isSpecific = false;
        };
      }
    );
    // this.hostStoreError.subscribe(
    //   error => {
    //     if (error !== '') {
    //       this.isSpecific = true;
    //       this.hostDetailForm.patchValue({ design: 'CUSTOM' });
    //     } else {
    //       this.isSpecific = false;
    //       this.hostDetailForm.patchValue({ design: 'GENERAL' });
    //     }
    //   }
    // );
  }

  onSuccessMessage(success: string) {
    this.successText = success;
    this.errorText = null;
  }

  onErrorMessage(error: string) {
    this.errorMessage = error;
    this.successText = null;
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
        this.loadHostData = false;
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
