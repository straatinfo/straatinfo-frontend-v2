import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { ILanguage } from '../interface/language/language.interface';
import { SessionService } from './session.service';
import { BACKEND_URL } from '../config';

@Injectable()
export class LanguageService {

  constructor(
    private http: Http,
    private sessionService: SessionService
  ) { }

  private languageUrl = `${BACKEND_URL}/v1/api/language`;

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  GetLanguages(baseWord: string): Observable<ILanguage[]> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.languageUrl}?baseWord=${baseWord}`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  CreateLanguage(baseWord: string, language: ILanguage): Observable<ILanguage> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.languageUrl}?baseWord=${baseWord}`, language, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share()
  }

  UpdateLanguage(baseWord: string, language: ILanguage): Observable<ILanguage> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.put(`${this.languageUrl}?baseWord=${baseWord}`, language, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  GetData(data) {
    return data.data;
  }
}
