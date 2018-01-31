import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../app.store';
import {
  TABLE_GET_PAGE,
  TABLE_RESET_PAGE,
  TABLE_UPDATE_PAGE
} from '../actions/table.action';

@Injectable()

export class TableActionCreator {

  constructor (
    private ngRedux: NgRedux<IAppState>
  ) {}

  GetPage(page: number) {
    this.ngRedux.dispatch({ type: TABLE_GET_PAGE, payload: page });
  }

  UpatePage(page: number) {
    this.ngRedux.dispatch({ type: TABLE_UPDATE_PAGE, payload: page });
  }

  ResetPage() {
    this.ngRedux.dispatch({ type: TABLE_RESET_PAGE });
  }

}
