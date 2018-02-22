import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { IMainCategory } from '../interface/category/main-category.interface';
import { IMainViewCategory } from '../interface/category/main-category-view.interface';
import { ISubCategory } from '../interface/category/sub-category.interface';
import { ISubViewCategory } from '../interface/category/sub-category-view.interface';
import { SessionService } from './session.service';
import { BACKEND_URL } from '../config';

@Injectable()
export class CategoryService {

  constructor(
    private http: Http,
    private sessionService: SessionService
  ) { }

  private categoryUrl = `${BACKEND_URL}/v1/api/category`;

  private GetSessionToken(): string {
    const session: ISession = this.sessionService.SessionRead();
    if (!session) {
      return 'invalid token';
    } else {
      return session.token;
    }
  }

  GetHostMainCategory(hostId: string): Observable<IMainViewCategory[]> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.categoryUrl}/mainCategory/hostId/${hostId}?flat=true`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  GetMainCategory(reportTypeId: string): Observable<IMainViewCategory[]> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.categoryUrl}/mainCategory/reportTypeId/${reportTypeId}?flat=true`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  GetSubCategory(mainCategoryId: string): Observable<ISubViewCategory[]> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.categoryUrl}/subCategory/mainCategoryId/${mainCategoryId}?flat=true`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  DeleteMainCategory(_id: string): Observable<any> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.delete(`${this.categoryUrl}/mainCategory/${_id}`, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  CreateMainCategory(_id: string, category: IMainViewCategory): Observable<IMainViewCategory> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.post(`${this.categoryUrl}/mainCategory/hostId/${_id}`, category, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  CreateSubCategory(_mainCategoryId: string, category: ISubViewCategory): Observable<ISubViewCategory> {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
      const options = new RequestOptions({ headers: headers });
      return this.http.post(`${this.categoryUrl}/subCategory/mainCategoryId/${_mainCategoryId}`, category, options)
          .map(response => response.json())
          .map(data => this.GetData(data))
          .share()
  }

  GetData(data) {
  console.log(data.data)
      return data.data;
  }
}
