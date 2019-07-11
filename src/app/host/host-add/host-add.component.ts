import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, CanDeactivate } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';

import { HostActionCreator } from '../../store/action-creators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-host-add',
  templateUrl: './host-add.component.html',
  styleUrls: ['./host-add.component.scss']
})
export class HostAddComponent implements OnInit, OnDestroy, CanDeactivate<HostAddComponent> {

  public addHostForm: FormGroup;
  private hostErrorSubscription: Subscription = null;
  public errorText: string = null;
  public successText: string = null;
  private isDirty: boolean = false;
  @select(s => s.host.error) hostStoreError;

  constructor(
    private formBuilder: FormBuilder,
    private hostActionCreator: HostActionCreator
  ) { }

  ngOnInit() {
    this.loadHostForm();
  }

  loadHostForm () {
    this.addHostForm = this.formBuilder.group({
      hostName: [null, Validators.required],
      hostAlternateName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      houseNumber: [null, Validators.required],
      streetName: [null, Validators.required],
      city: [null, Validators.required],
      state: [null],
      country: [null, Validators.required],
      postalCode: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      long: [null, Validators.required],
      lat: [null, Validators.required],
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      hostPersonalEmail: [null, Validators.required],
    });
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (this.isDirty) {
      return swal({
        title: 'Do you want to discard changes?',
        text: 'Please click submit to save changes',
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
    (this.hostErrorSubscription) ? this.hostErrorSubscription.unsubscribe(): null;
  }

  setToDirty() {
    this.isDirty = true;
  }
  submit() {
    this.isDirty = false;
    if (this.addHostForm.valid) {
      this.errorText = null;
      this.successText = null;
      this.hostActionCreator.CreateHost(this.addHostForm.value);
      this.loadHostForm();
    } else {
      swal('warning', 'Please complete the form');
    }
  }
  onReset() {
    this.addHostForm.reset();
  }
}
