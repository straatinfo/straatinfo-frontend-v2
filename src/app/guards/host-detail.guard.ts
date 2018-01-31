import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import * as _ from 'lodash';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Subscription';
import { IHost } from 'app/interface/host/host.interface';

@Injectable()
export class HostDetailGuard implements CanActivate {

  @select(s => s.host.hosts) hosts;
  private hostData: IHost[];

  constructor (
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.hosts
    .map(hosts => {
      const host = _.find(hosts, (h) => {
        return h.id == next.params.id;
      });
      if (host) {
        return true;
      } else {
        this.router.navigate(['admin/host']);
      }
    });
  }

}
