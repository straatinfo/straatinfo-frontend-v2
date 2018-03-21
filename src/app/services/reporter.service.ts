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

    GetReporterById(_id: string): Observable<IReporter> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.reporterUrl}/${_id}?flat=true`, options)
            .map(response => response.json())
            .map(data => this.GetData(data))
            .share()
    }

    GetLatestReporter(): Observable<IReporter[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.reporterUrl}?flat=true`, options)
            .map(response => response.json())
            .map(data => this.GetData(data))
            .share();
    }

    GetLatestReporterByHost(_hostId: string): Observable<IReporter[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.reporterUrl}/host/${_hostId}?flat=true`, options)
            .map(response => response.json())
            .map(data => this.GetData(data))
            .share();
    }

    BlockReporter(_id: string): Observable<IReporter> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(`${this.reporterUrl}/block/${_id}`, { _id }, options)
            .map(response => response.json())
            .map(data => this.GetData(data))
            .share();
    }

    UnblockReporter(_id: string): Observable<IReporter> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(`${this.reporterUrl}/unblock/${_id}`, { _id }, options)
            .map(response => response.json())
            .map(data => this.GetData(data))
            .share();
    }

    DeleteReporter(_id: string): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(`${this.reporterUrl}/${_id}`, options)
            .map(response => response.json())
            .map(data => this.GetData(data))
            .share()
    }

    GetData(data) {
        return data.data;
    }
}
