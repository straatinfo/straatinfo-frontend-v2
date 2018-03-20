import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import * as _ from 'lodash';

import { ISession } from '../interface/session/session.interface';
import { IMainCategory } from '../interface/category/main-category.interface';
import { IMainCategoryView } from '../interface/category/main-category-view.interface';
import { IMainCategoryCreate } from '../interface/category/main-category-create.interface';
import { ISubCategory } from '../interface/category/sub-category.interface';
import { ISubCategoryView } from '../interface/category/sub-category-view.interface';
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

  GetHostMainCategory(hostId: string, code: string = 'A', flat: boolean = true): Observable<IMainCategory[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.categoryUrl}/mainCategory/hostId/${hostId}?flat=${flat}&code=${code}`, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share()
  }

  GetMainCategory(reportTypeId: string, flat: boolean = true): Observable<IMainCategory[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.categoryUrl}/mainCategory/reportTypeId/${reportTypeId}?flat=${flat}`, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share()
  }

  GetSubCategory(_mainCategory: string, flat: boolean = true): Observable<ISubCategory[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.categoryUrl}/subCategory/mainCategoryId/${_mainCategory}?flat=${flat}`, options)
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

  DeleteSubCategory(_id: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(`${this.categoryUrl}/subCategory/${_id}`, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share()
  }

  CreateMainCategory(_host: string, category: IMainCategoryCreate, flat: boolean = true): Observable<IMainCategory> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.categoryUrl}/mainCategory/hostId/${_host}?flat=${flat}`, category, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share()
  }

  CreateSubCategory(_mainCategory: string, category: ISubCategoryView, flat: boolean = true): Observable<ISubCategory> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.categoryUrl}/subCategory/mainCategoryId/${_mainCategory}?flat=${flat}`, category, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share()
  }

  GetGeneralMainCategory(code: string, flat: boolean = true): Observable<IMainCategory[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.categoryUrl}/mainCategory/general?flat=${flat}&code=${code}`, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share()
  }

  CreateGeneralMainCategory(mainCategory: IMainCategoryCreate, flat: boolean = true) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.GetSessionToken()}`);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.categoryUrl}/mainCategory/general?flat=${flat}`, mainCategory, options)
      .map(response => response.json())
      .map(data => this.GetData(data))
      .share()
  }

  GetData(data) {
    return data.data;
  }
}
