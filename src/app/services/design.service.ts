import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { IDesign } from '../interface/design/design.interface';
import { SessionService } from './session.service';
import { BACKEND_URL } from '../config';

@Injectable()
export class DesignService {

  constructor(
    private http: Http,
    private sessionService: SessionService
  ) { }

  private designUrl = `${BACKEND_URL}/v1/api/design`;

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  GetDesignByHostId(_hostId: string, flat: boolean = true): Observable<IDesign[]> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.designUrl}/host/${_hostId}?flat=${flat}`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  GetDesignById(_id: string, flat: boolean = true): Observable<IDesign> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.designUrl}/${_id}?flat=${flat}`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  CreateDesign(hostId: string, design: IDesign, flat: boolean = true): Observable<IDesign> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.post(`${this.designUrl}/host/${hostId}?flat=${flat}`, design, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  UpdateDesign(_id: string, design: IDesign, flat: boolean = true): Observable<IDesign> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.put(`${this.designUrl}/${_id}?flat=${flat}`, design, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  DeleteDesign(_id: string): Observable<any> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.delete(`${this.designUrl}/${_id}`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  SetAsActiveDesign(_id: string, _host: string, flat: boolean = true): Observable<IDesign> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.designUrl}/activeDesign/${_host}/${_id}?flat=${flat}`,{}, options)
        .map(response => response.json())
        .map(data => this.GetData(data))
        .share()
  }

  GetData(data) {
      return data.data;
  }
}
