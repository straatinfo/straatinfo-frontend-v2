import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2';
import { ISession } from 'app/interface/session/session.interface';


@Injectable()
export class HostGuard implements CanActivate, CanActivateChild {

  private session: ISession = JSON.parse(localStorage.getItem('session'));

  constructor (
    private router: Router
  ) {}

  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.session || !this.session.token || (this.session.user._role.accessLevel !== 2 )) {
      swal({
        type: 'error',
        title: 'Invalid URL',
        text: 'This content is not available.',
      }).then(() => {
        this.router.navigate([`${this.session.user._role.code.toLowerCase()}/login`]);
      });
    } else {
      return true;
    }
  }

  canActivateChild(
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.session || !this.session.token || (this.session.user._role.accessLevel !== 2 )) {
      swal({
        type: 'error',
        title: 'Invalid URL',
        text: 'This content is not available.',
      }).then(() => {
        this.router.navigate(['auth/login']);
      });
    } else {
      return true;
    }
  }
}
