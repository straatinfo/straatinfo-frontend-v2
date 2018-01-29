import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { IHost } from '../interface/host/host.interface';
import { SessionService } from './session.service';
import { BACKEND_URL } from '../config';

@Injectable()
export class HostService {

  constructor(
    private http: Http,
    private sessionService: SessionService
  ) { }

  private hostUrl = `${BACKEND_URL}/v1/api/host`;

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  GetHosts (): Observable<IHost[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.hostUrl}`, options)
    .map(response => response.json())
    .share()
  }

  GetHostById (id: number): Observable<IHost> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.hostUrl}/${id}`, options)
    .map(response => response.json())
    .share()
  }

  GetHostByPage (pageNumber: number, itemPerPage: number): Observable<IHost[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.hostUrl}/page/${pageNumber}/${itemPerPage}`, options)
    .map(response => response.json())
    .share()
  }

  GetHostWithinRadius (long: number, lat: number, radius: number): Observable<IHost[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.hostUrl}/withinRadius/${long}/${lat}/${radius}`, options)
    .map(response => response.json())
    .share()
  }

  UpdateHost (id: number, host:IHost): Observable<IHost> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.hostUrl}/${id}`,host, options)
    .map(response => response.json())
    .share()
  }

  DeleteHost (id: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.hostUrl}/${id}`, options)
    .map(response => response.json())
    .share()
  }
}
