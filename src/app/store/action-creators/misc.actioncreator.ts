import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';
import { DialogService } from '../../services/dialog.service';
import { IAppState } from '../app.store';
import {
  GET_INVITATION_CODE_FULFILLED,
  TOGGLE_FORGOT_PASSWORD,
  SIGN_IN_BUFFER_PAGE_ON,
  SIGN_IN_BUFFER_PAGE_OFF,
  UPDATE_PAGE_TITLE_FULFILLED,
  LOAD_SPINNER,
  UNLOAD_SPINNER,
  FILE_UPLOAD_FULFILLED
} from '../actions/misc.actions';

@Injectable()

export class MiscActionCreator implements OnDestroy {

  private forgotPasswordSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnDestroy () {
    (this.forgotPasswordSubscription) ? this.forgotPasswordSubscription.unsubscribe() : null;
  }

  StoreInvitationCode (code: string) {
    this.ngRedux.dispatch({type: GET_INVITATION_CODE_FULFILLED, payload: code});
  }

  ToggleForgotPassword () {
    this.ngRedux.dispatch({ type: TOGGLE_FORGOT_PASSWORD });
  }

  SignInBUfferPageOn () {
    this.ngRedux.dispatch({ type: SIGN_IN_BUFFER_PAGE_ON });
  }

  SignInBUfferPageOff() {
    this.ngRedux.dispatch({ type: SIGN_IN_BUFFER_PAGE_OFF });
  }

  UpdatePageTitle (title: string) {
    this.ngRedux.dispatch({ type: UPDATE_PAGE_TITLE_FULFILLED, payload: title });
  }

  LoadSpinner () {
    this.ngRedux.dispatch({ type: LOAD_SPINNER });
  }

  UnloadSpinner () {
    this.ngRedux.dispatch({ type: UNLOAD_SPINNER });
  }

  FileUploadFulfilled (result) {
    this.ngRedux.dispatch({ type: FILE_UPLOAD_FULFILLED, payload: result });
  }
}
