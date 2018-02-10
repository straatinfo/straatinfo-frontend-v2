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
    .map(data => this.GetData(data))
    .share();
  }

  GetLatestReportByHost(_hostId: string): Observable<IReport[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.reportUrl}/host/${_hostId}`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share();
  }

  UpdateReport (_id: string, note: string, status: string): Observable<IReport> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.reportUrl}/${_id}`, { _id, note, status}, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share();
  }

   DeleteReport(_id: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.reportUrl}/${_id}`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share();
  }

   GetData(data) {
    return data.data;
  }

}
