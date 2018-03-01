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
  HOST_SELECT_FULFILLED,
  HOST_SELECT_FAILED,
  HOST_SELECT_ATTEMPT
} from '../actions/host.action';


@Injectable()

export class HostActionCreator implements OnDestroy {

  private errorMessage: string;
  private getHostsSubscription: Subscription = null;
  private updateHostSubscription: Subscription = null;
  private deleteHostSubscription: Subscription = null;
  private getHostByIdSubscription: Subscription = null;
  private createHostSubscription: Subscription = null;
  private createHostBulkSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private hostService: HostService
  ) {}

  ngOnDestroy () {
    (this.getHostsSubscription) ? this.getHostsSubscription.unsubscribe() : null;
    (this.updateHostSubscription) ? this.updateHostSubscription.unsubscribe() : null;
    (this.deleteHostSubscription) ? this.deleteHostSubscription.unsubscribe() : null;
    (this.getHostByIdSubscription) ? this.getHostByIdSubscription.unsubscribe() : null;
    (this.createHostSubscription) ? this.createHostSubscription.unsubscribe() : null;
    (this.createHostBulkSubscription) ? this.createHostBulkSubscription.unsubscribe() : null;
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

  CreateHost (host: IHost) {
    this.ngRedux.dispatch({ type: HOST_CREATE_ATTEMPT });
    this.createHostSubscription = this.hostService.CreateHost(host)
    .map(data => this.ToHostView(data))
    .subscribe(
      (host: IHost) => {
        this.ngRedux.dispatch({ type: HOST_CREATE_FULFILLED, payload: host });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: HOST_CREATE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateHost (_id: string, host:IHost) {
    this.ngRedux.dispatch({ type: HOST_UPDATE_ATTEMPT });
    this.updateHostSubscription = this.hostService.UpdateHost(_id, host)
    .map(data => this.ToHostView(data))
    .subscribe(
      (host: IHost) => {
        this.ngRedux.dispatch({ type: HOST_UPDATE_FULFILLED, payload: host });
        this.ngRedux.dispatch({ type: HOST_SELECT_FULFILLED, payload: host._id });
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

  DeleteHost (_id: string, host:IHost) {
    this.ngRedux.dispatch({ type: HOST_DELETE_ATTEMPT });
    this.deleteHostSubscription = this.hostService.DeleteHost(_id)
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

  GetHostById (_id: string) {
    this.ngRedux.dispatch({ type: HOST_SELECT_ATTEMPT });
    this.getHostByIdSubscription = this.hostService.GetHostById(_id)
    .map(data => this.ToHostView(data))
    .subscribe(
      (host:IHost) => {
        this.ngRedux.dispatch({ type: HOST_SELECT_FULFILLED, payload: host });
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

  CreateBulkHost (hosts: IHost[]) {
    this.ngRedux.dispatch({ type: HOST_CREATE_ATTEMPT });
    this.createHostBulkSubscription = this.hostService.CreateBulkHost(hosts)
    .subscribe(
      (data: any) => {
        this.GetHosts();
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: HOST_CREATE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  SelectHost (_id: string) {
    this.ngRedux.dispatch({ type: HOST_SELECT_FULFILLED, payload: _id });
  }

  private ToHostView(data: any): IHost {
    return {
      _id: data._id,
      hostName: data.hostName,
      email: data.email,
      username: data.username,
      streetName: data.streetName,
      city: data.city,
      state: data.state,
      country: data.country,
      postalCode: data.postalCode,
      long: data.long,
      lat: data.lat,
      phoneNumber: data.phoneNumber,
      isBlocked: data.isBlocked,
      design: data.design,
      fname: data.fname,
      lname: data.lname,
      hostPersonalEmail: data.hostPersonalEmail,
      designType: data['_activeDesign.designName'],
      _role: data._role,
    };
  }
}
