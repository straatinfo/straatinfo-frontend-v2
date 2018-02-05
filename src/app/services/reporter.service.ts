import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { IReporter } from '../interface/reporter/reporter.interface';
import { SessionService } from './session.service';
import { BACKEND_URL } from '../config';

@Injectable()
export class ReporterService {

  constructor(
    private http: Http,
    private sessionService: SessionService
  ) { }

  private reporterUrl = `${BACKEND_URL}/v1/api/reporter`;

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  GetLatestReporter (): Observable<IReporter[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.reporterUrl}`, options)
    .map(response => response.json())
    .share();
  }

  GetLatestReporterByHost(hostId: number): Observable<IReporter[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.reporterUrl}/${hostId}`, options)
        .map(response => response.json())
        .share();
  }

  UpdateReporter(id: number): Observable<IReporter> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.put(`${this.reporterUrl}/${id}`, { id }, options)
          .map(response => response.json())
          .share();
  }

  DeleteReporter(id: number): Observable<any> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.delete(`${this.reporterUrl}/${id}`, options)
          .map(response => response.json())
          .share();
  }
}
