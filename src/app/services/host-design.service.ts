import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { IHostDesign } from '../interface/host/host-design.interface';
import { SessionService } from './session.service';
import { BACKEND_URL } from '../config';

@Injectable()
export class HostDesignService {

  constructor(
    private http: Http,
    private sessionService: SessionService
  ) { }

  private hostDesignUrl = `${BACKEND_URL}/v1/api/hostDesign`;

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  GetHostDesignById(id: number): Observable<IHostDesign> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.hostDesignUrl}/${id}`, options)
          .map(response => response.json())
          .share()
  }

  UpdateHostDesign(id: number, hostDesign: IHostDesign): Observable<IHostDesign> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.put(`${this.hostDesignUrl}/${id}`, hostDesign, options)
          .map(response => response.json())
          .share()
  }
}
