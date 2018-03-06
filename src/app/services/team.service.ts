import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { ITeam } from '../interface/team/team.interface';
import { ITeamView } from '../interface/team/team-view.interface';
import { SessionService } from './session.service';
import { BACKEND_URL } from '../config';

@Injectable()
export class TeamService {

  constructor(
    private http: Http,
    private sessionService: SessionService
  ) { }

  private teamUrl = `${BACKEND_URL}/v1/api/team`;

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  GetTeams(): Observable<ITeamView[]> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.teamUrl}?flat=true`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  CreateTeam(_userId: string, team: ITeamView): Observable<ITeamView> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.post(`${this.teamUrl}/new/${_userId}`, team, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  SetAsTeamLeader(_userId: string, _teamId: string): Observable<any> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.teamUrl}/leader/${_userId}/${_teamId}`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  SetAsTeamMember(_userId: string, _teamId: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.teamUrl}/member/${_userId}/${_teamId}`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share();
  }

  JoinTeam(_userId: string, _teamId: string): Observable<any> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.teamUrl}/member/${_userId}/${_teamId}`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share();
  }

  GetNonApprovedTeam(): Observable<ITeam[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.teamUrl}/approve?isApproved=false&flat=true`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share()
  }

  ApproveTeam (_id): Observable<ITeam> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.teamUrl}/approve`, {teamId: _id}, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share()
  }

  DeclineTeam (_id): Observable<ITeam> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.teamUrl}/approve`, {teamId: _id}, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
    .share()
  }

  GetData(data) {
    return data.data;
  }
}
