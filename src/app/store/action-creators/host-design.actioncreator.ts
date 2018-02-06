import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { HostDesignService } from '../../services';
import { IHostDesign } from '../../interface/host/host-design.interface';

import { 
  HOSTDESIGN_CREATE_ATTEMPT,
  HOSTDESIGN_CREATE_FAILED,
  HOSTDESIGN_CREATE_FULFILLED,
  HOSTDESIGN_DELETE_ATTEMPT,
  HOSTDESIGN_DELETE_FAILED,
  HOSTDESIGN_DELETE_FULFILLED,
  HOSTDESIGN_GET_ATTEMPT,
  HOSTDESIGN_GET_FAILED,
  HOSTDESIGN_GET_FULFILLED,
  HOSTDESIGN_UPDATE_ATTEMPT,
  HOSTDESIGN_UPDATE_FAILED,
  HOSTDESIGN_UPDATE_FULFILLED,
  HOSTDESIGN_SELECT_FULFILLED,
  HOSTDESIGN_SELECT_FAILED,
  HOSTDESIGN_SELECT_ATTEMPT
} from '../actions/host-design.action';


@Injectable()

export class HostDesignActionCreator implements OnDestroy {

  private errorMessage: string;
  private getHostDesignByIdSubscription: Subscription = null;
  private updateHostDesignSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private hostDesignService: HostDesignService
  ) {}

  ngOnDestroy () {
    (this.getHostDesignByIdSubscription) ? this.getHostDesignByIdSubscription.unsubscribe() : null;
    (this.updateHostDesignSubscription) ? this.updateHostDesignSubscription.unsubscribe() : null;
  }

  GetHostDesignByHostId(_id: string) {
    this.ngRedux.dispatch({ type: HOSTDESIGN_SELECT_ATTEMPT });
    this.getHostDesignByIdSubscription = this.hostDesignService.GetHostDesignById(_id)
        .map(data => this.ToHostDesignView(data))
        .subscribe(
        (hostDesign: IHostDesign) => {
            this.ngRedux.dispatch({ type: HOSTDESIGN_SELECT_FULFILLED, payload: hostDesign });
        }, err => {
            this.errorMessage = err._body;
            if (this.errorMessage && typeof this.errorMessage === 'string') {
                this.ngRedux.dispatch({ type: HOSTDESIGN_GET_FAILED, error: this.errorMessage });
            }
        },
        () => {
            this.errorMessage = null;
        }
        );
  }

  UpdateHostDesign(_id: string, hostDesign: IHostDesign) {
      this.ngRedux.dispatch({ type: HOSTDESIGN_UPDATE_ATTEMPT });
      this.updateHostDesignSubscription = this.hostDesignService.UpdateHostDesign(_id, hostDesign)
          .map(data => this.ToHostDesignView(data))
          .subscribe(
          (hostDesign: IHostDesign) => {
              this.ngRedux.dispatch({ type: HOSTDESIGN_UPDATE_FULFILLED, payload: hostDesign });
              this.ngRedux.dispatch({ type: HOSTDESIGN_SELECT_FULFILLED, payload: hostDesign._id });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: HOSTDESIGN_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  SelectHostDesign(_id: string) {
      this.ngRedux.dispatch({ type: HOSTDESIGN_SELECT_FULFILLED, payload: _id });
  }

  private ToHostDesignView(data: any): IHostDesign {
      return {
          _id: data._id,
          hostId: data.hostId,
          color1: data.color1,
          color2: data.color2,
          color3: data.color3,
          logo: data.logo,
          logoUrl: data.logoUrl,          
      };
  }
}
