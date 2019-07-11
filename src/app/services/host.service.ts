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
    return this.http.get(`${this.hostUrl}?flat=true`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share()
  }

  GetFreeHost(): Observable<IHost> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.hostUrl}/freeHost`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  GetHostById (_id: string, flat: boolean = false): Observable<IHost> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.hostUrl}/${_id}?flat=${flat}`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share()
  }

  GetHostByPage (pageNumber: number, itemPerPage: number): Observable<IHost[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.hostUrl}/page/${pageNumber}/${itemPerPage}`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share()
  }

  GetHostWithinRadius (long: number, lat: number, radius: number): Observable<IHost[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.hostUrl}/withinRadius/${long}/${lat}/${radius}`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share()
  }

  CreateHost (host: IHost): Observable<IHost> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.hostUrl}`,host, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share()
  }

  UpdateHost (_id: string, host: IHost): Observable<IHost> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.hostUrl}/${_id}`, host, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share();
  }

  DeleteHost (_id: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.hostUrl}/${_id}`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share()
  }

  CreateBulkHost (hosts: IHost[]): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.hostUrl}/bulk`,hosts, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share()
  }

  UpdateHostDesign (_id: string, isSpecific: boolean): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.hostUrl}/design/${_id}?isSpecific=${isSpecific}`, {}, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share()
  }

  ActivateHost(_hostEmail): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.hostUrl}/activation?email=${_hostEmail}`, {}, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share();
  }

  DeactivateHost(_hostEmail): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.hostUrl}/activation?email=${_hostEmail}`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share();
  }

  GetData(data) {
    return data.data;
  }
}
