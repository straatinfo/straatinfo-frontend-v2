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

  GetDesignByHostId(_hostId: string): Observable<IDesign[]> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.designUrl}/host/${_hostId}`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  GetDesignById(_id: string): Observable<IDesign> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.designUrl}/${_id}`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  CreateDesign(hostId: string, design: IDesign): Observable<IDesign> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.post(`${this.designUrl}/host/${hostId}`, design, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  UpdateDesign(_id: string, design: IDesign): Observable<IDesign> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.put(`${this.designUrl}/${_id}`, design, options)
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

  GetData(data) {
      return data.data;
  }
}
