import { IUser } from 'app/interface/user/user.interface';
import { Component, OnInit, DoCheck, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { select, ObservableStore } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';


@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  @Output() changePassword = new EventEmitter<string>();
  @Output() sendChanges = new EventEmitter<boolean>();

  public adminDetailForm: FormGroup;
  public user: IUser = JSON.parse(localStorage.getItem('session')).user;
  public errorText: string = null;
  public successText: string = null;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.adminDetailForm = this.formBuilder.group({
      _id: [{value: this.user._id, disabled: true}],
      email: [{value: this.user.email, disabled: true}],
      role: [{value: this.user._role.code, disabled: true}],
      username: [{value: this.user.username, disabled: true}]
    });
  }

  onChangePassword() {
    this.changePassword.emit(this.user.email);
  }

  setToDirty(isDirty: boolean) {
    this.sendChanges.emit(isDirty);
  }

}
