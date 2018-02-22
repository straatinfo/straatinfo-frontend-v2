import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { CategoryService } from '../../services';
import { IMainCategory } from '../../interface/category/main-category.interface';
import { IMainViewCategory } from '../../interface/category/main-category-view.interface';
import { ISubCategory } from '../../interface/category/sub-category.interface';
import { ISubViewCategory } from '../../interface/category/sub-category-view.interface';

import { 
    CATEGORYMAIN_A_CREATE_ATTEMPT,
    CATEGORYMAIN_A_CREATE_FAILED,
    CATEGORYMAIN_A_CREATE_FULFILLED,
    CATEGORYMAIN_A_DELETE_ATTEMPT,
    CATEGORYMAIN_A_DELETE_FAILED,
    CATEGORYMAIN_A_DELETE_FULFILLED,
    CATEGORYMAIN_A_GET_ATTEMPT,
    CATEGORYMAIN_A_GET_FAILED,
    CATEGORYMAIN_A_GET_FULFILLED,
    CATEGORYMAIN_A_UPDATE_ATTEMPT,
    CATEGORYMAIN_A_UPDATE_FAILED,
    CATEGORYMAIN_A_UPDATE_FULFILLED,
    CATEGORYMAIN_A_SELECT_FULFILLED,
    CATEGORYMAIN_A_SELECT_FAILED,
    CATEGORYMAIN_A_SELECT_ATTEMPT
} from '../actions/categoryMainA.action';

import {
    CATEGORYMAIN_B_CREATE_ATTEMPT,
    CATEGORYMAIN_B_CREATE_FAILED,
    CATEGORYMAIN_B_CREATE_FULFILLED,
    CATEGORYMAIN_B_DELETE_ATTEMPT,
    CATEGORYMAIN_B_DELETE_FAILED,
    CATEGORYMAIN_B_DELETE_FULFILLED,
    CATEGORYMAIN_B_GET_ATTEMPT,
    CATEGORYMAIN_B_GET_FAILED,
    CATEGORYMAIN_B_GET_FULFILLED,
    CATEGORYMAIN_B_UPDATE_ATTEMPT,
    CATEGORYMAIN_B_UPDATE_FAILED,
    CATEGORYMAIN_B_UPDATE_FULFILLED,
    CATEGORYMAIN_B_SELECT_FULFILLED,
    CATEGORYMAIN_B_SELECT_FAILED,
    CATEGORYMAIN_B_SELECT_ATTEMPT
} from '../actions/categoryMainB.action';

import {
    CATEGORYMAIN_C_CREATE_ATTEMPT,
    CATEGORYMAIN_C_CREATE_FAILED,
    CATEGORYMAIN_C_CREATE_FULFILLED,
    CATEGORYMAIN_C_DELETE_ATTEMPT,
    CATEGORYMAIN_C_DELETE_FAILED,
    CATEGORYMAIN_C_DELETE_FULFILLED,
    CATEGORYMAIN_C_GET_ATTEMPT,
    CATEGORYMAIN_C_GET_FAILED,
    CATEGORYMAIN_C_GET_FULFILLED,
    CATEGORYMAIN_C_UPDATE_ATTEMPT,
    CATEGORYMAIN_C_UPDATE_FAILED,
    CATEGORYMAIN_C_UPDATE_FULFILLED,
    CATEGORYMAIN_C_SELECT_FULFILLED,
    CATEGORYMAIN_C_SELECT_FAILED,
    CATEGORYMAIN_C_SELECT_ATTEMPT
} from '../actions/categoryMainC.action';

import {
    CATEGORYSUB_A_CREATE_ATTEMPT,
    CATEGORYSUB_A_CREATE_FAILED,
    CATEGORYSUB_A_CREATE_FULFILLED,
    CATEGORYSUB_A_DELETE_ATTEMPT,
    CATEGORYSUB_A_DELETE_FAILED,
    CATEGORYSUB_A_DELETE_FULFILLED,
    CATEGORYSUB_A_GET_ATTEMPT,
    CATEGORYSUB_A_GET_FAILED,
    CATEGORYSUB_A_GET_FULFILLED,
    CATEGORYSUB_A_UPDATE_ATTEMPT,
    CATEGORYSUB_A_UPDATE_FAILED,
    CATEGORYSUB_A_UPDATE_FULFILLED,
    CATEGORYSUB_A_SELECT_FULFILLED,
    CATEGORYSUB_A_SELECT_FAILED,
    CATEGORYSUB_A_SELECT_ATTEMPT
} from '../actions/categorySubA.action';

@Injectable()

export class CategoryActionCreator implements OnDestroy {

  private errorMessage: string;
  private getCategorySubscription: Subscription = null;
  private updateCategorySubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnDestroy () {
      (this.getCategorySubscription) ? this.getCategorySubscription.unsubscribe() : null;
      (this.updateCategorySubscription) ? this.updateCategorySubscription.unsubscribe() : null;
  }

  GetHostMainCategory(hostId: string) {
      this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_ATTEMPT });
      this.getCategorySubscription = this.categoryService.GetHostMainCategory(hostId)
          .map((data: any[]) => { return data.map(d => this.ToMainCategoryView(d)); })
          .subscribe(
          (category: IMainViewCategory[]) => {
              this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_FULFILLED, payload: category });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  GetSubCategory(mainCategoryId: string) {
      this.ngRedux.dispatch({ type: CATEGORYSUB_A_GET_ATTEMPT });
      this.getCategorySubscription = this.categoryService.GetSubCategory(mainCategoryId)
          .map((data: any[]) => { return data.map(d => this.ToSubCategoryView(d)); })
          .subscribe(
          (category: ISubViewCategory[]) => {
              this.ngRedux.dispatch({ type: CATEGORYSUB_A_GET_FULFILLED, payload: category });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYSUB_A_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  GetMainCategoryA(reportTypeId: string) {
      this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_ATTEMPT });
      this.getCategorySubscription = this.categoryService.GetMainCategory(reportTypeId)
          .map((data: any[]) => { return data.map(d => this.ToMainCategoryView(d)); })
          .subscribe(
          (category: IMainViewCategory[]) => {
              this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_FULFILLED, payload: category });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  GetMainCategoryB(reportTypeId: string) {
      this.ngRedux.dispatch({ type: CATEGORYMAIN_B_GET_ATTEMPT });
      this.getCategorySubscription = this.categoryService.GetMainCategory(reportTypeId)
          .map((data: any[]) => { return data.map(d => this.ToMainCategoryView(d)); })
          .subscribe(
          (category: IMainViewCategory[]) => {
              this.ngRedux.dispatch({ type: CATEGORYMAIN_B_GET_FULFILLED, payload: category });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYMAIN_B_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  GetMainCategoryC(reportTypeId: string) {
      this.ngRedux.dispatch({ type: CATEGORYMAIN_C_GET_ATTEMPT });
      this.getCategorySubscription = this.categoryService.GetMainCategory(reportTypeId)
          .map((data: any[]) => { return data.map(d => this.ToMainCategoryView(d)); })
          .subscribe(
          (category: IMainViewCategory[]) => {
              this.ngRedux.dispatch({ type: CATEGORYMAIN_C_GET_FULFILLED, payload: category });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYMAIN_C_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  DeleteMainCategoryA(_id: string) {
      this.ngRedux.dispatch({ type: CATEGORYMAIN_A_DELETE_ATTEMPT });
      this.updateCategorySubscription = this.categoryService.DeleteMainCategory(_id)
          .subscribe(
          data => {
              this.ngRedux.dispatch({ type: CATEGORYMAIN_A_DELETE_FULFILLED, payload: _id });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  DeleteMainCategoryB(_id: string) {
      this.ngRedux.dispatch({ type: CATEGORYMAIN_B_DELETE_ATTEMPT });
      this.updateCategorySubscription = this.categoryService.DeleteMainCategory(_id)
          .subscribe(
          data => {
              this.ngRedux.dispatch({ type: CATEGORYMAIN_B_DELETE_FULFILLED, payload: _id });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYMAIN_B_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  DeleteMainCategoryC(_id: string) {
      this.ngRedux.dispatch({ type: CATEGORYMAIN_C_DELETE_ATTEMPT });
      this.updateCategorySubscription = this.categoryService.DeleteMainCategory(_id)
          .subscribe(
          data => {
              this.ngRedux.dispatch({ type: CATEGORYMAIN_C_DELETE_FULFILLED, payload: _id });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYMAIN_C_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  DeleteSubCategoryA(_id: string) {
      this.ngRedux.dispatch({ type: CATEGORYSUB_A_DELETE_ATTEMPT });
      this.updateCategorySubscription = this.categoryService.DeleteSubCategory(_id)
          .subscribe(
          data => {
              this.ngRedux.dispatch({ type: CATEGORYSUB_A_DELETE_FULFILLED, payload: _id });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYSUB_A_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  CreateMainCategoryA(_id: string, category: IMainViewCategory) {
      this.ngRedux.dispatch({ type: CATEGORYMAIN_A_UPDATE_ATTEMPT });
      this.updateCategorySubscription = this.categoryService.CreateMainCategory(_id, category)
          .map(data => this.ToMainCategoryView(data))
          .subscribe(
          (category: IMainViewCategory) => {
              this.ngRedux.dispatch({ type: CATEGORYMAIN_A_UPDATE_FULFILLED, payload: category });
              this.ngRedux.dispatch({ type: CATEGORYMAIN_A_SELECT_FULFILLED, payload: category._id });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYMAIN_A_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  CreateMainCategoryB(_id: string, category: IMainViewCategory) {
      this.ngRedux.dispatch({ type: CATEGORYMAIN_B_UPDATE_ATTEMPT });
      this.updateCategorySubscription = this.categoryService.CreateMainCategory(_id, category)
          .map(data => this.ToMainCategoryView(data))
          .subscribe(
          (category: IMainViewCategory) => {
              this.ngRedux.dispatch({ type: CATEGORYMAIN_B_UPDATE_FULFILLED, payload: category });
              this.ngRedux.dispatch({ type: CATEGORYMAIN_B_SELECT_FULFILLED, payload: category._id });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYMAIN_B_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  CreateMainCategoryC(_id: string, category: IMainViewCategory) {
      this.ngRedux.dispatch({ type: CATEGORYMAIN_C_UPDATE_ATTEMPT });
      this.updateCategorySubscription = this.categoryService.CreateMainCategory(_id, category)
          .map(data => this.ToMainCategoryView(data))
          .subscribe(
          (category: IMainViewCategory) => {
              this.ngRedux.dispatch({ type: CATEGORYMAIN_C_UPDATE_FULFILLED, payload: category });
              this.ngRedux.dispatch({ type: CATEGORYMAIN_C_SELECT_FULFILLED, payload: category._id });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYMAIN_C_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  CreateSubCategoryA(_mainCategoryId: string, category: ISubViewCategory) {
      this.ngRedux.dispatch({ type: CATEGORYSUB_A_UPDATE_ATTEMPT });
      this.updateCategorySubscription = this.categoryService.CreateSubCategory(_mainCategoryId, category)
          .map(data => this.ToSubCategoryView(data))
          .subscribe(
          (category: ISubViewCategory) => {
              this.ngRedux.dispatch({ type: CATEGORYSUB_A_UPDATE_FULFILLED, payload: category });
              this.ngRedux.dispatch({ type: CATEGORYSUB_A_SELECT_FULFILLED, payload: category._id });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: CATEGORYSUB_A_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  private ToMainCategoryView(data: any): IMainViewCategory {
      return {
          _id: data._id,
          name: data.name,
          description: data.description,
          _reportType: data._reportType,
      };
  }

  private ToSubCategoryView(data: any): ISubViewCategory {
      return {
          _id: data._id,
          name: data.name,
          description: data.description,
          mainCategoryName: data._mainCategory.name        
      };
  }
}
