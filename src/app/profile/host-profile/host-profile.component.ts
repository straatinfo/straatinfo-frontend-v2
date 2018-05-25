import { ISession } from 'app/interface/session/session.interface';

import { Component, OnInit, DoCheck, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { select, ObservableStore } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

import { HostActionCreator, SessionActionCreator } from '../../store/action-creators';
import { IHost } from 'app/interface/host/host.interface';
import { IHostView } from '../../interface/host/host-view.interface';
import { IHostStore } from '../../store/host.store';

@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrls: ['./host-profile.component.scss']
})
export class HostProfileComponent implements OnInit, OnDestroy, DoCheck {

  @Output() sendChanges = new EventEmitter<boolean>();
  @Output() changePassword = new EventEmitter<string>();

  @Input() hostId: string
  public isLoading: boolean = false;
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
  private language: string = null;
  public isActivated: boolean = false;
  @select(s => s.host.error) hostStoreError;
  @select(s => s.host.selectedHost) selectedHost;
  @select(s => s.host) host$: Observable<IHostStore>;

  constructor(
    private actvatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private hostActionCreator: HostActionCreator,
    private sessionActionCreator: SessionActionCreator
  ) { }

  ngOnInit() {
    this.hostActionCreator.SelectHost(this.hostId);
    this.hostSubscription = this.selectedHost
      .subscribe(
        (host: IHostView) => {
          this.loadHostData = true;
          this.hostData = host;
          this.isSpecific = (host) ? host.isSpecific : null;
        }
      );
  }

  ngDoCheck() {
    if (this.hostDetailForm && this.hostDetailForm.value.language !== this.language) {
      this.isDirty = true;
      this.setToDirty(true);
    }
    if (this.hostData && this.loadHostData) this.onLoadForm(this.hostData);
    if (this.errorMessage) this.onErrorMessage(this.errorMessage);
    if (this.successMessage) {
      this.onSuccessMessage(this.successMessage);
    }
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

  onLoadForm(host: IHostView) {
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
      isActivated: [host.isActivated, Validators.required],
      isSpecific: [host.isSpecific],
      language: [host.language, Validators.required]
    });
    this.loadHostData = false;
    this.language = host.language;
    this.isActivated = host.isActivated;
  }

  setToDirty(isDirty: boolean) {
    this.isDirty = isDirty;
    this.sendChanges.emit(isDirty);
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

  onUpdate() {
    this.isDirty = false;
    this.setToDirty(false);
    this.loadHostData = true;
    this.errorText = null;
    this.successText = null;
    this.language = this.hostDetailForm.value.language;
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
    this.updateLanguage(this.hostDetailForm.value.language);
  }

  onChangePassword() {
    this.changePassword.emit(this.hostData.email);
  }

  onSuccessMessage(success: string) {
    this.successText = success;
    this.errorText = null;
  }

  onErrorMessage(error: string) {
    this.errorMessage = error;
    this.successText = null;
  }

  updateLanguage(language) {
    const oldSession: ISession = JSON.parse(localStorage.getItem('session'));
    const newSession: ISession = {...oldSession, user: {...oldSession.user, language}};
    localStorage.setItem('session', JSON.stringify(newSession));
    window.location.reload();
  }

}
