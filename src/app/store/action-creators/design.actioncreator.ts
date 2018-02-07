import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { DesignService } from '../../services';
import { IDesign } from '../../interface/design/design.interface';

import { 
  DESIGN_CREATE_ATTEMPT,
  DESIGN_CREATE_FAILED,
  DESIGN_CREATE_FULFILLED,
  DESIGN_DELETE_ATTEMPT,
  DESIGN_DELETE_FAILED,
  DESIGN_DELETE_FULFILLED,
  DESIGN_GET_ATTEMPT,
  DESIGN_GET_FAILED,
  DESIGN_GET_FULFILLED,
  DESIGN_UPDATE_ATTEMPT,
  DESIGN_UPDATE_FAILED,
  DESIGN_UPDATE_FULFILLED,
  DESIGN_SELECT_FULFILLED,
  DESIGN_SELECT_FAILED,
  DESIGN_SELECT_ATTEMPT
} from '../actions/design.action';


@Injectable()

export class DesignActionCreator implements OnDestroy {

  private errorMessage: string;
  private getDesignByIdSubscription: Subscription = null;
  private updateDesignSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private designService: DesignService
  ) {}

  ngOnDestroy () {
    (this.getDesignByIdSubscription) ? this.getDesignByIdSubscription.unsubscribe() : null;
    (this.updateDesignSubscription) ? this.updateDesignSubscription.unsubscribe() : null;
  }

  GetDesignByHostId(_hostId: string) {
      this.ngRedux.dispatch({ type: DESIGN_SELECT_ATTEMPT });
      this.getDesignByIdSubscription = this.designService.GetDesignByHostId(_hostId)
          .map(data => this.ToDesignView(data))
          .subscribe(
          (design: IDesign) => {
              this.ngRedux.dispatch({ type: DESIGN_SELECT_FULFILLED, payload: design });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: DESIGN_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  GetDesignById(_id: string) {
    this.ngRedux.dispatch({ type: DESIGN_SELECT_ATTEMPT });
    this.getDesignByIdSubscription = this.designService.GetDesignById(_id)
        .map(data => this.ToDesignView(data))
        .subscribe(
        (design: IDesign) => {
            this.ngRedux.dispatch({ type: DESIGN_SELECT_FULFILLED, payload: design });
        }, err => {
            this.errorMessage = err._body;
            if (this.errorMessage && typeof this.errorMessage === 'string') {
                this.ngRedux.dispatch({ type: DESIGN_GET_FAILED, error: this.errorMessage });
            }
        },
        () => {
            this.errorMessage = null;
        }
        );
  }

  UpdateDesign(_id: string, design: IDesign) {
      this.ngRedux.dispatch({ type: DESIGN_UPDATE_ATTEMPT });
      this.updateDesignSubscription = this.designService.UpdateDesign(_id, design)
          .map(data => this.ToDesignView(data))
          .subscribe(
          (design: IDesign) => {
              this.ngRedux.dispatch({ type: DESIGN_UPDATE_FULFILLED, payload: design });
              this.ngRedux.dispatch({ type: DESIGN_SELECT_FULFILLED, payload: design._id });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: DESIGN_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  SelectDesign(_id: string) {
      this.ngRedux.dispatch({ type: DESIGN_SELECT_FULFILLED, payload: _id });
  }

  private ToDesignView(data: any): IDesign {
      return {
          _id: data._id,
          _host: data._host.hostName,
          colorOne: data.color1,
          colorTwo: data.color2,
          colorThree: data.color3,
          secure_url: data.logo,
          url: data.logoUrl,          
      };
  }
}
