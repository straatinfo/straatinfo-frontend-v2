import { ISession } from './../interface/session/session.interface';
import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
@Injectable()
export class RoutingState {
  private history = [];
  private session: ISession = JSON.parse(localStorage.getItem(('session')));

  constructor(
    private router: Router
  ) {
    if (this.history.length === 0) {
      this.history = JSON.parse(localStorage.getItem('routerHistory')) || [`/${this.session.user._role.code.toLowerCase()}/dashboard`];
    }
  }

  public loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        if (this.history[this.history.length - 1] !== urlAfterRedirects) {
          this.history = [...this.history, urlAfterRedirects];

          localStorage.setItem('routerHistory', JSON.stringify(this.history.reverse().slice(10).reverse()));
        }
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || `/${this.session.user._role.code.toLowerCase()}/dashboard`;
  }
}
