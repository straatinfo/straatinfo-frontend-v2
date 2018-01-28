import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { ISessionCreate } from '../interface/session/session-create.interface';
import { IUserNew } from '../interface/user/user-new.interface';
import { BACKEND_URL } from '../config';

@Injectable()
export class SessionService {

  private authUrl: string = `${BACKEND_URL}/v1/api/auth`;
  constructor(
    private http: Http
  ) { 
    console.log(this.authUrl);
  }

  Register (userNew: IUserNew): Observable<ISession> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.authUrl}/register`, userNew, options)
    .map(response => response.json())
    .share()
  }

  Login (sessionCreate: ISessionCreate): Observable<ISession> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.authUrl}/login`, sessionCreate, options)
    .map(response => response.json())
    .share()
  }

  SessionSave(session: ISession): void {
    localStorage.setItem('session', JSON.stringify(session));
  }

  SessionRead(): ISession {
    return JSON.parse(localStorage.getItem('session'));
  }

  SessionDestroy(): void {
    localStorage.clear();
  }

}
