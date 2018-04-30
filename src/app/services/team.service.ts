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

  GetTeamsWithFilter(_host: string): Observable<ITeamView[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    const queryObject = { '_host': _host };
    return this.http.post(`${this.teamUrl}?flat=true`, {queryObject}, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share()
  }

  CreateTeam(_userId: string, _hostId: string, team: any): Observable<ITeamView> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    const query = `_host=${_hostId}&_user=${_userId}`;
    return this.http.post(`${BACKEND_URL}/v2/api/team?${query}`, team, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share();
  }

  SetAsTeamLeader(_userId: string, _teamId: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    const query = `keyword=setleader&_user=${_userId}&_team=${_teamId}`;
    return this.http.put(`${BACKEND_URL}/v2/api/team?${query}`,{} , options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share();
  }

  SetAsTeamMember(_userId: string, _teamId: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    const query = `keyword=setmember&_user=${_userId}&_team=${_teamId}`;
    return this.http.put(`${BACKEND_URL}/v2/api/team?${query}`,{} , options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share();
  }

  JoinTeam(_userId: string, _teamId: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    const query = `keyword=join&_user=${_userId}&_team=${_teamId}`;
    return this.http.put(`${BACKEND_URL}/v2/api/team?${query}`,{} , options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share();
  }

  UnJoinTeam(_userId: string, _teamId: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    const query = `keyword=unjoin&_user=${_userId}&_team=${_teamId}`;
    return this.http.put(`${BACKEND_URL}/v2/api/team?${query}`,{} , options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share();
  }

  SetActiveTeam(_userId: string, _teamId: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    const query = `keyword=setactiveteam&_user=${_userId}&_team=${_teamId}`;
    return this.http.put(`${BACKEND_URL}/v2/api/team?${query}`,{} , options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share();
  }

  GetNonApprovedTeam(): Observable<ITeam[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.teamUrl}/approve?isApproved=false&flat=true`, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share()
  }

  ApproveTeam(_id): Observable<ITeam> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.teamUrl}/approve`, { teamId: _id }, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share()
  }

  DeclineTeam(_id): Observable<ITeam> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.teamUrl}/approve`, { teamId: _id }, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share()
  }

  GetData(data) {
    return data.data;
  }
}
