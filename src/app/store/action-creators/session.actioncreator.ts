import { IChangePassword } from './../../interface/session/change-password.interface';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { SessionService } from '../../services';
import swal from 'sweetalert2';
import { ISessionCreate } from '../../interface/session/session-create.interface';
import { ISession } from '../../interface/session/session.interface';
import { IUserNew } from '../../interface/user/user-new.interface';

import { 
  SESSION_CREATE_ATTEMPT,
  SESSION_CREATE_FULFILLED,
  SESSION_CHECK_FULFILLED,
  SESSION_CREATE_FAILED,
  SESSION_CHECK_ATTEMPT,
  SESSION_CHECK_FAILED,
  SESSION_DESTROY_FULFILLED
} from '../actions/session.action';


@Injectable()

export class SessionActionCreator implements OnDestroy {

  private loginSubscription: Subscription = null;
  private registerSubscription: Subscription = null;
  private errorMessage: string = null;
  private changePasswordSubscription: Subscription = null;
  private forgotPasswordSubscription: Subscription = null;
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnDestroy () {
    (this.loginSubscription) ? this.loginSubscription.unsubscribe() : null;
    (this.registerSubscription) ? this.registerSubscription.unsubscribe() : null;
    (this.changePasswordSubscription) ? this.changePasswordSubscription.unsubscribe() : null;
    (this.forgotPasswordSubscription) ? this.forgotPasswordSubscription.unsubscribe() : null;
  }

  Login (sessionCreate: ISessionCreate) {
    this.ngRedux.dispatch({ type: SESSION_CREATE_ATTEMPT });
    this.loginSubscription = this.sessionService.Login(sessionCreate)
    .subscribe(
      (session: ISession) => {
        this.sessionService.SessionSave(session);
        this.ngRedux.dispatch({type: SESSION_CREATE_FULFILLED, payload: session});
        this.router.navigate([`/${session.user._role.code.toLowerCase()}`]);
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SESSION_CREATE_FAILED, error: this.errorMessage });
          swal({
            type: 'error',
            title: 'Login Error',
            text: 'Invalid Login credential or password.'
          }).then(() => {
            window.location.reload();
          });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  Register (userNew: IUserNew) {
    this.registerSubscription = this.sessionService.Register(userNew)
    .subscribe(
      (session: ISession) => {
        this.sessionService.SessionSave(session);
        this.ngRedux.dispatch({type: SESSION_CREATE_FULFILLED, payload: session});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SESSION_CREATE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }


  SessionCheck () {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) { 
      this.ngRedux.dispatch({type: SESSION_CHECK_FAILED, error:`Session has Expired.` });
    } else {
      this.ngRedux.dispatch({type: SESSION_CHECK_FULFILLED, payload: session});
    }
  }

  SessionDestroy () {
    this.sessionService.SessionDestroy();
    this.ngRedux.dispatch({ type: SESSION_DESTROY_FULFILLED });
  }

  ChangePassword (changePassword: IChangePassword, cb) {
    this.changePasswordSubscription = this.sessionService.ChangePassword(changePassword)
    .subscribe(
      result => {
        cb(null, 'Successfully changed password');
      },
      err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          const wrongPasswordError = this.errorMessage.toLowerCase() === 'unauthorized' ? 'Wrong Current password Input' : this.errorMessage;
          cb((this.IsJsonString(this.errorMessage).message) ? this.IsJsonString(this.errorMessage).message : wrongPasswordError);
        }
      }
    );
  }

  ForgotPassword (email: string, cb) {
    this.forgotPasswordSubscription = this.sessionService.ForgotPassword(email)
    .subscribe(
      result => {
        cb(null, 'Please check your email for the temporary password');
      },
      err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          cb((this.IsJsonString(this.errorMessage).message) ? this.IsJsonString(this.errorMessage).message : this.errorMessage);
        }
      }
    );
  }
  IsJsonString (str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  }
}
