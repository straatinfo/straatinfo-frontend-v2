import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';

import { HostActionCreator } from '../../store/action-creators';

@Component({
  selector: 'app-host-add',
  templateUrl: './host-add.component.html',
  styleUrls: ['./host-add.component.scss']
})
export class HostAddComponent implements OnInit, OnDestroy {

  public addHostForm: FormGroup;
  private hostErrorSubscription: Subscription = null;
  public errorText: string = null;
  public successText: string = null;
  @select(s => s.host.error) hostStoreError;

  constructor(
    private formBuilder: FormBuilder,
    private hostActionCreator: HostActionCreator
  ) { }

  ngOnInit() {
    this.addHostForm = this.formBuilder.group({
      hostName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      username: [null, Validators.required],
      houseNumber: [null, Validators.required],
      streetName: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
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

  ngOnDestroy() {
    (this.hostErrorSubscription) ? this.hostErrorSubscription.unsubscribe(): null;
  }

  submit() {
    //if (this.addHostForm.valid) {
      this.errorText = null;
      this.successText = null;
      this.hostActionCreator.CreateHost(this.addHostForm.value);
      this.hostErrorSubscription = this.hostStoreError.subscribe(
        error => {
          if (error) {
            console.log(error);
            this.errorText = error;
          } else {
            this.addHostForm.reset();
            this.successText = 'The Host has been added.';
          }
        }
      );
    //}
  }
  onReset() {
    this.addHostForm.reset();
  }
}
