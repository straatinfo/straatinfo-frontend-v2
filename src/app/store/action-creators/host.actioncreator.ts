import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { HostService, DesignService, DialogService } from '../../services';

import { IHost } from '../../interface/host/host.interface';
import { IHostView } from '../../interface/host/host-view.interface';

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
  HOST_SELECT_ATTEMPT,
  HOST_DESIGN_TYPE_UPDATE_ATTEMPT,
  HOST_DESIGN_TYPE_UPDATE_FAILED,
  HOST_DESIGN_TYPE_UPDATE_FULFILLED,
  HOST_RESET_SELECT_FULFILLED,
  HOST_SELECT_ACTIVE_DESIGN_ATTEMPT,
  HOST_SELECT_ACTIVE_DESIGN_FULFILLED,
  HOST_SELECT_ACTIVE_DESIGN_FAILED
} from '../actions/host.action';
import { IDesign } from '../../interface/design/design.interface';
import { IDesignView } from '../../interface/design/design-view.interface';


@Injectable()

export class HostActionCreator implements OnDestroy {

  private errorMessage: string;
  private getHostsSubscription: Subscription = null;
  private updateHostSubscription: Subscription = null;
  private deleteHostSubscription: Subscription = null;
  private getHostByIdSubscription: Subscription = null;
  private createHostSubscription: Subscription = null;
  private createHostBulkSubscription: Subscription = null;
  private updateHostDesignTypeSubscription: Subscription = null;
  private getOneHostSubscription: Subscription = null;
  private getActiveDesignSubscription: Subscription = null;
  private setActiveDesignSubscription: Subscription = null;
  private activateHostSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private hostService: HostService,
    private dialogService: DialogService,
    private designService: DesignService
  ) {}

  ngOnDestroy () {
    (this.getHostsSubscription) ? this.getHostsSubscription.unsubscribe() : null;
    (this.updateHostSubscription) ? this.updateHostSubscription.unsubscribe() : null;
    (this.deleteHostSubscription) ? this.deleteHostSubscription.unsubscribe() : null;
    (this.getHostByIdSubscription) ? this.getHostByIdSubscription.unsubscribe() : null;
    (this.createHostSubscription) ? this.createHostSubscription.unsubscribe() : null;
    (this.createHostBulkSubscription) ? this.createHostBulkSubscription.unsubscribe() : null;
    (this.updateHostDesignTypeSubscription) ? this.updateHostDesignTypeSubscription.unsubscribe() : null;
    (this.getOneHostSubscription) ? this.getHostByIdSubscription.unsubscribe() : null;
    (this.getActiveDesignSubscription) ? this.getActiveDesignSubscription.unsubscribe() : null;
    (this.setActiveDesignSubscription) ? this.setActiveDesignSubscription.unsubscribe() : null;
    (this.activateHostSubscription) ? this.activateHostSubscription.unsubscribe() : null;
  }

  GetHosts () {
    this.ngRedux.dispatch({ type: HOST_GET_ATTEMPT });
    this.getHostsSubscription = this.hostService.GetHosts()
    .map((data: any[]) => { return data.map(d => this.ToHostView(d)); })
    .subscribe(
      (host: IHostView[]) => {
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
      (host: IHostView) => {
        this.ngRedux.dispatch({ type: HOST_CREATE_FULFILLED, payload: host });
        this.dialogService.showSwal('success-message', {title: 'New Host', text: 'Successfully Added Host'});
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
      (host: IHostView) => {
        this.ngRedux.dispatch({ type: HOST_UPDATE_FULFILLED, payload: host });
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

  DeleteHost (_id: string, host: IHost) {
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
      (host:IHostView) => {
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

  UpdateHostDesign (_host: string, isSpecific: boolean) {
    this.ngRedux.dispatch({ type: HOST_DESIGN_TYPE_UPDATE_ATTEMPT });
    this.updateHostDesignTypeSubscription = this.hostService.UpdateHostDesign(_host, isSpecific)
    .subscribe(
      (data: any) => {
        this.ngRedux.dispatch({ type: HOST_DESIGN_TYPE_UPDATE_FULFILLED, payload: { _id: _host, isSpecific: isSpecific }});
        this.dialogService.showSwal('success-message', {title: 'Host Design Type Update', text: 'Successfully Updated Design type'});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: HOST_CREATE_FAILED, error: this.errorMessage });
          this.dialogService.showSwal('error-message', {title: 'Host Design Type Update', text: 'Unable to update host at this time' });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  SelectHost (_id: string) {
    this.ngRedux.dispatch({ type: HOST_SELECT_ATTEMPT });
    this.getOneHostSubscription = this.hostService.GetHostById(_id, true)
    .map(data => this.ToHostView(data))
    .subscribe(
      (host: IHostView) => {
        this.ngRedux.dispatch({ type: HOST_SELECT_FULFILLED, payload: host });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: HOST_SELECT_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetActiveDesign (_activeDesign: string) {
    this.ngRedux.dispatch({ type: HOST_SELECT_ACTIVE_DESIGN_ATTEMPT });
    this.getActiveDesignSubscription = this.designService.GetDesignById(_activeDesign, false)
    .map(data => this.ToDesignView(data))
    .subscribe(
      (design: IDesignView) => {
        this.ngRedux.dispatch({ type: HOST_SELECT_ACTIVE_DESIGN_FULFILLED, payload: design });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: HOST_SELECT_ACTIVE_DESIGN_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  SetActiveDesign(_id: string, _host: string, flat: boolean = true) {
    this.ngRedux.dispatch({ type: HOST_SELECT_ACTIVE_DESIGN_ATTEMPT });
    this.setActiveDesignSubscription = this.designService.SetAsActiveDesign(_id, _host, flat)
    .map(data => this.ToDesignView(data))
    .subscribe(
      (design: IDesignView) => {
        this.ngRedux.dispatch({ type: HOST_SELECT_ACTIVE_DESIGN_FULFILLED, payload: design });
        this.dialogService.showSwal('success-message', {title: 'Design Selected', text: `Design: ${design.designName} was successfully set`});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: HOST_SELECT_ACTIVE_DESIGN_FAILED, error: this.errorMessage });
          this.dialogService.showSwal('error-message', {title: 'Design Not Selected', text: `There is an unexpected problem, Please try again next time.`});
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  ResetSelectedHost () {
    this.ngRedux.dispatch({ type: HOST_RESET_SELECT_FULFILLED });
  }

  ActivateHost(_hostEmail, cb) {
    this.activateHostSubscription = this.hostService.ActivateHost(_hostEmail)
    .subscribe(
      () => {
        cb(null, 'Successfully Activated the host');
      },
      err => {
        if (err._body && typeof(err._body) === 'string') {
          cb(JSON.parse(err._body).message ? JSON.parse(err._body).message : 'There was an unexpected error');
        }
      }
    );
  }

  private ToDesignView(data: any): IDesignView {
    return {
      _id: data._id,
      colorOne: data.colorOne,
      colorTwo: data.colorTwo,
      colorThree: data.colorThree,
      colorFour: data.colorFour,
      designName: data.designName,
      _profilePicUrl: (data._profilePic && data._profilePic.url) ? data._profilePic.url : null,
      _profilePicSecureUrl: (data._profilePic && data._profilePic.secure_url) ? data._profilePic.secure_url : null,
    };
  }

  private ToHostView(data: IHost): IHostView {
    return {
      _id: data._id,
      hostName: data.hostName,
      email: data.email,
      username: data.username,
      houseNumber: data.houseNumber,
      streetName: data.streetName,
      city: data.city,
      state: data.state,
      country: data.country,
      postalCode: data.postalCode,
      long: data.long,
      lat: data.lat,
      phoneNumber: data.phoneNumber,
      isBlocked: data.isBlocked,
      design: (data.isSpecific === true) ? 'CUSTOM' : 'GENERAL',
      designs: data['designs'],
      isSpecific: data.isSpecific,
      fname: data.fname,
      lname: data.lname,
      isPatron: data.isPatron,
      hostPersonalEmail: data.hostPersonalEmail,
      designType: data['_activeDesign.designName'],
      language: data.language,
      _role: data['_role._id'],
      _roleCode: data['_role.code'],
      _roleName: data['_role.name'],
      _activeDesign: data['_activeDesign._id']
    };
  }
}
