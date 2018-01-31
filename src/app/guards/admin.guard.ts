import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2';
import { ISession } from 'app/interface/session/session.interface';


@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor (
    private router: Router
  ) {}

  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    const session: ISession = JSON.parse(localStorage.getItem('session'));
    if (!session || !session.token || (session.user.roleId !== 1 )) {
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

  canActivateChild(
  ): Observable<boolean> | Promise<boolean> | boolean {
    const session: ISession = JSON.parse(localStorage.getItem('session'));
    if (!session || !session.token || (session.user.roleId !== 1 )) {
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
