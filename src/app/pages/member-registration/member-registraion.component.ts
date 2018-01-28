import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { NgFor } from '@angular/common';
import { IUserNew } from '../../interface/user/user-new.interface';
import { GENDER } from '../../config';
@Component({
  selector: 'app-member-registraion',
  templateUrl: './member-registraion.component.html',
  styleUrls: ['./member-registraion.component.scss']
})
export class MemberRegistraionComponent implements OnInit {

  @Output()submit: EventEmitter<IUserNew> = new EventEmitter<IUserNew>();
  private registerForm: FormGroup;
  private genders = GENDER;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      email: [null, Validators.email],
      username: [null, Validators.required],
      gender: ['Male', Validators.required ],
      address: [null, Validators.required],
      postalCode: [null, Validators.required],
      city: [null, Validators.required],
      nickName: [null],
      roleId: [3, Validators.required],
      password: [null, Validators.required],
      confirmedPassword: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.submit.emit(this.registerForm.value);
    }
  }

}
