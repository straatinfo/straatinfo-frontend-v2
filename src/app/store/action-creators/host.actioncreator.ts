import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { HostService } from '../../services';

import { IHost } from '../../interface/host/host.interface';

import { 
  HOST_CREATE_ATTEMPT,
  HOST_CREATE_FAILED,
  HOST_CREATE_FULFILLED,
  HOST_DELETE_ATTEMPT,
  HOST_DELETE_FAILED,
  HOST_DELETE_FULFILLED,
  HOST_GET_ATTEMPT,
  HOST_GET_FAILED,
  HOST_GET_FULFILLED,
  HOST_UPDATE_ATTEMPT,
  HOST_UPDATE_FAILED,
  HOST_UPDATE_FULFILLED,
  HOST_SELECT_FULFILLED
} from '../actions/host.action';


@Injectable()

export class HostActionCreator implements OnDestroy {

  private errorMessage: string;
  private getHostsSubscription: Subscription = null;
  private updateHostSubscription: Subscription = null;
  private deleteHostSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private hostService: HostService
  ) {}

  ngOnDestroy () {
    (this.getHostsSubscription) ? this.getHostsSubscription.unsubscribe() : null;
    (this.updateHostSubscription) ? this.updateHostSubscription.unsubscribe() : null;
    (this.deleteHostSubscription) ? this.deleteHostSubscription.unsubscribe() : null;
  }

  GetHosts () {
    this.ngRedux.dispatch({ type: HOST_GET_ATTEMPT });
    this.getHostsSubscription = this.hostService.GetHosts()
    .map((data: any[]) => { return data.map(d => this.ToHostView(d)); })
    .subscribe(
      (host: IHost[]) => {
        this.ngRedux.dispatch({type: HOST_GET_FULFILLED, payload: host});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: HOST_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateHost (id: number, host:IHost) {
    this.ngRedux.dispatch({ type: HOST_UPDATE_ATTEMPT });
    this.updateHostSubscription = this.hostService.UpdateHost(id, host)
    .map(data => this.ToHostView(data))
    .subscribe(
      (host: IHost) => {
        this.ngRedux.dispatch({ type: HOST_UPDATE_FULFILLED, payload: host });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: HOST_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteHost (id: number, host:IHost) {
    this.ngRedux.dispatch({ type: HOST_DELETE_ATTEMPT });
    this.deleteHostSubscription = this.hostService.DeleteHost(id)
    .subscribe(
      data => {
        this.ngRedux.dispatch({ type: HOST_DELETE_FULFILLED, payload: host });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: HOST_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  SelectHost (host: IHost) {
    this.ngRedux.dispatch({ type: HOST_SELECT_FULFILLED, payload: host });
  }

  private ToHostView (data: any): IHost {
    return {
      id: data.id,
      institutionName: data.institutionName,
      email: data.email,
      username: data.username,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      nickName: data.nickName,
      lat: data.lat,
      long: data.long,
      role: data.role,
      roleId: data.roleId
    };
  }
}
