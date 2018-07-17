
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { ISystemLanguage } from './../interface/language/language-system.interface';
import { LanguageActionCreator } from './../store/action-creators/language.actioncreator';
import { SYSTEM_LANGUAGES } from '../config/translation/language.list';
import { TRANSLATION } from './../config/translation/translation';
import { ISession } from 'app/interface/session/session.interface';
import { SessionService } from '../services/session.service';

@Pipe({
  name: 'translation'
})
export class TranslationPipe implements PipeTransform {
  constructor (
    private languageActionCreator: LanguageActionCreator,
    private sessionService: SessionService
  ) {}
  GetTranslation (id, languageString: string = null) {
    // @TODO this can be used in the future
    // const systemLanguage: ISystemLanguage = this.languageActionCreator.GetSystemLanguage();
    // const session: ISession = JSON.parse(localStorage.getItem('session'));
    const session: ISession = this.sessionService.SessionRead();
    const checkLanguage: ISystemLanguage = _.find(SYSTEM_LANGUAGES, (sl) =>
    session.user.language.toUpperCase() === sl.name.toUpperCase() || session.user.language.toUpperCase() === sl.code.toUpperCase());
    const language: ISystemLanguage = checkLanguage ? checkLanguage : _.find(SYSTEM_LANGUAGES, (sl) => sl.code.toUpperCase() === 'EN');
    const ln = languageString ? languageString.toUpperCase() : language.code.toUpperCase();
    return TRANSLATION[ln][id] ? TRANSLATION[ln][id] : id;
  }
  transform(value: any, languageString?: any): any {
    return this.GetTranslation(value, languageString);
  }

}
