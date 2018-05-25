
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { ISystemLanguage } from './../interface/language/language-system.interface';
import { LanguageActionCreator } from './../store/action-creators/language.actioncreator';
import { SYSTEM_LANGUAGES } from '../config/translation/language.list';
import { TRANSLATION } from './../config/translation/translation';
import { ISession } from 'app/interface/session/session.interface';

@Pipe({
  name: 'translation'
})
export class TranslationPipe implements PipeTransform {
  constructor (
    private languageActionCreator: LanguageActionCreator
  ) {}
  GetTranslation (id) {
    // @TODO this can be used in the future
    // const systemLanguage: ISystemLanguage = this.languageActionCreator.GetSystemLanguage();
    const session: ISession = JSON.parse(localStorage.getItem('session'));
    const checkLanguage: ISystemLanguage = _.find(SYSTEM_LANGUAGES, (sl) =>
    session.user.language.toUpperCase() === sl.name.toUpperCase() || session.user.language.toUpperCase() === sl.code.toUpperCase());
    const language: ISystemLanguage = checkLanguage ? checkLanguage : _.find(SYSTEM_LANGUAGES, (sl) => sl.code.toUpperCase() === 'EN');
    return TRANSLATION[language.code.toUpperCase()][id] ? TRANSLATION[language.code.toUpperCase()][id] : id;
  }
  transform(value: any, args?: any): any {
    return this.GetTranslation(value);
  }

}
