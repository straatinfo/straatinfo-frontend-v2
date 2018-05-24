import { ISystemLanguage } from './../../interface/language/language-system.interface';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { LanguageService, DialogService } from '../../services';

import {
  LANGUAGE_CREATE_ATTEMPT,
  LANGUAGE_CREATE_FAILED,
  LANGUAGE_CREATE_FULFILLED,
  LANGUAGE_DELETE_ATTEMPT,
  LANGUAGE_DELETE_FAILED,
  LANGUAGE_DELETE_FULFILLED,
  LANGUAGE_GET_ATTEMPT,
  LANGUAGE_GET_FAILED,
  LANGUAGE_GET_FULFILLED,
  LANGUAGE_UPDATE_ATTEMPT,
  LANGUAGE_UPDATE_FAILED,
  LANGUAGE_UPDATE_FULFILLED,
  LANGUAGE_SELECT_FULFILLED,
  LANGUAGE_SELECT_FAILED,
  LANGUAGE_SELECT_ATTEMPT,
  LANGUAGE_DESIGN_TYPE_UPDATE_ATTEMPT,
  LANGUAGE_DESIGN_TYPE_UPDATE_FAILED,
  LANGUAGE_DESIGN_TYPE_UPDATE_FULFILLED,
  LANGUAGE_RESET_SELECT_FULFILLED,
  LANGUAGE_SELECT_ACTIVE_DESIGN_ATTEMPT,
  LANGUAGE_SELECT_ACTIVE_DESIGN_FULFILLED,
  LANGUAGE_SELECT_ACTIVE_DESIGN_FAILED,
  LANGUAGE_SYSTEM_SELECT_ATTEMPT,
  LANGUAGE_SYSTEM_SELECT_FAILED,
  LANGUAGE_SYSTEM_SELECT_FULFILLED
} from '../actions/language.action';
import { ILanguage } from '../../interface/language/language.interface';
import { ILanguageView } from '../../interface/language/language-view.interface';


@Injectable()

export class LanguageActionCreator implements OnDestroy {

  private errorMessage: string;
  private getLanguageSubscription: Subscription = null;
  private createLanguageSubscription: Subscription = null;
  private updateLanguageSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private languageService: LanguageService,
    private dialogService: DialogService
  ) {}

  ngOnDestroy () {
      (this.getLanguageSubscription) ? this.getLanguageSubscription.unsubscribe() : null;
      (this.createLanguageSubscription) ? this.createLanguageSubscription.unsubscribe() : null;
      (this.updateLanguageSubscription) ? this.updateLanguageSubscription.unsubscribe() : null;
  }

  GetLanguages (baseWord: string) {
    this.ngRedux.dispatch({ type: LANGUAGE_GET_ATTEMPT });
    this.getLanguageSubscription = this.languageService.GetLanguages(baseWord)
    .map((data: any[]) => data.map(d => this.ToLanguageView(d)))
    .subscribe(
        (host: ILanguageView[]) => {
        this.ngRedux.dispatch({type: LANGUAGE_GET_FULFILLED, payload: host});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: LANGUAGE_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  CreateLanguage(baseWord: string, language: ILanguage) {
    this.ngRedux.dispatch({ type: LANGUAGE_CREATE_ATTEMPT });
    this.createLanguageSubscription = this.languageService.CreateLanguage(baseWord, language)
        .map(data => this.ToLanguageView(data))
    .subscribe(
        (host: ILanguageView) => {
        this.ngRedux.dispatch({ type: LANGUAGE_CREATE_FULFILLED, payload: host });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: LANGUAGE_CREATE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateLanguage(baseWord: string, language: ILanguage) {
      this.ngRedux.dispatch({ type: LANGUAGE_UPDATE_ATTEMPT });
      this.updateLanguageSubscription = this.languageService.UpdateLanguage(baseWord, language)
          .map(data => this.ToLanguageView(data))
          .subscribe(
          (host: ILanguageView) => {
              this.ngRedux.dispatch({ type: LANGUAGE_UPDATE_FULFILLED, payload: host });
              this.ngRedux.dispatch({ type: LANGUAGE_SELECT_FULFILLED, payload: host });
          }, err => {
              this.errorMessage = err._body;
              if (this.errorMessage && typeof this.errorMessage === 'string') {
                  this.ngRedux.dispatch({ type: LANGUAGE_GET_FAILED, error: this.errorMessage });
              }
          },
          () => {
              this.errorMessage = null;
          }
          );
  }

  GetSystemLanguage(): ISystemLanguage {
    this.ngRedux.dispatch({ type: LANGUAGE_SYSTEM_SELECT_ATTEMPT });
    const systemLanguage: ISystemLanguage = this.languageService.GetSystemLanguage();
    this.ngRedux.dispatch({ type: LANGUAGE_SYSTEM_SELECT_FULFILLED, payload: systemLanguage });
    return systemLanguage;
  }

  SetSystemLanguage(systemLanguage: ISystemLanguage) {
    this.languageService.SetSystemLanguage(systemLanguage);
    this.ngRedux.dispatch({ type: LANGUAGE_SYSTEM_SELECT_FULFILLED, payload: systemLanguage });
  }

  private ToLanguageView(data: any): ILanguageView {
    return {
      code: data.code,
      word: data.word
    };
  }
}
