import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { IUserNew } from '../../interface/user/user-new.interface';

@Component({
  selector: 'app-host-registration',
  templateUrl: './host-registration.component.html',
  styleUrls: ['./host-registration.component.scss']
})
export class HostRegistrationComponent implements OnInit {

  @Output()submit: EventEmitter<IUserNew> = new EventEmitter<IUserNew>();
  private registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      institutionName: [null, Validators.required],
      email: [null, Validators.email],
      username: [null, Validators.required],
      address: [null, Validators.required],
      postalCode: [null, Validators.required],
      city: [null, Validators.required],
      nickName: [null],
      roleId: [2, Validators.required],
      password: [null, Validators.required],
      confirmedPassword: [null, Validators.required],
      long: [null, Validators.required],
      lat: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.submit.emit(this.registerForm.value);
    }
  }
}
