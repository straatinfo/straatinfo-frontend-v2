import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { IReport } from '../interface/report/report.interface';
import { SessionService } from './session.service';
import { BACKEND_URL } from '../config';

@Injectable()
export class ReportService {

  constructor(
    private http: Http,
    private sessionService: SessionService
  ) { }

  private reportUrl = `${BACKEND_URL}/v1/api/report`;

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  GetLatestReport (): Observable<IReport[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.reportUrl}`, options)
    .map(response => response.json())
    .share();
  }

  UpdateReport (id: number, note: string, status: string): Observable<IReport> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.reportUrl}/${id}`, {id, note, status}, options)
    .map(response => response.json())
    .share();
  }

  DeleteReport (id: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.reportUrl}/${id}`, options)
    .map(response => response.json())
    .share();
  }

}
