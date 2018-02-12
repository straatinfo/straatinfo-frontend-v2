import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { CategoryService } from '../../services';
import { IMainCategory } from '../../interface/category/main-category.interface';

import { 
  CATEGORY_CREATE_ATTEMPT,
  CATEGORY_CREATE_FAILED,
  CATEGORY_CREATE_FULFILLED,
  CATEGORY_DELETE_ATTEMPT,
  CATEGORY_DELETE_FAILED,
  CATEGORY_DELETE_FULFILLED,
  CATEGORY_GET_ATTEMPT,
  CATEGORY_GET_FAILED,
  CATEGORY_GET_FULFILLED,
  CATEGORY_UPDATE_ATTEMPT,
  CATEGORY_UPDATE_FAILED,
  CATEGORY_UPDATE_FULFILLED,
  CATEGORY_SELECT_FULFILLED,
  CATEGORY_SELECT_FAILED,
  CATEGORY_SELECT_ATTEMPT
} from '../actions/category.action';


@Injectable()

export class CategoryActionCreator implements OnDestroy {

  private errorMessage: string;
  private getCategorySubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnDestroy () {
    (this.getCategorySubscription) ? this.getCategorySubscription.unsubscribe() : null;
  }

  GetMainCategory() {
      this.ngRedux.dispatch({ type: CATEGORY_GET_ATTEMPT });
      this.getCategorySubscription = this.categoryService.GetMainCategory()
          .map((data: any[]) => { return data.map(d => this.ToMainCategoryView(d)); })
          .subscribe(
          (category: IMainCategory[]) => {
              this.ngRedux.dispatch({ type: CATEGORY_GET_FULFILLED, payload: category });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORY_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  private ToMainCategoryView(data: any): IMainCategory {
      return {
          _id: data._id,
          name: data.name,
          description: data.description,
      };
  }
}
