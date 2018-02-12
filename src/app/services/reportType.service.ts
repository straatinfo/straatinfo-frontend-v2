import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { IReportType } from '../interface/report/report-type.interface';
import { SessionService } from './session.service';
import { BACKEND_URL } from '../config';

@Injectable()
export class ReportTypeService {

  constructor(
    private http: Http,
    private sessionService: SessionService
  ) { }

  private reportTypeUrl = `${BACKEND_URL}/v1/api/reportType`;

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  GetReportType(): Observable<IReportType[]> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.reportTypeUrl}`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  UpdateReportType(_id: string, reportType: IReportType): Observable<IReportType> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.put(`${this.reportTypeUrl}/${_id}`, reportType, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  GetData(data) {
      return data.data;
  }
}
