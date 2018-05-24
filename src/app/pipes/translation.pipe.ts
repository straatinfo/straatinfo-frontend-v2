import { Pipe, PipeTransform } from '@angular/core';
import { ISystemLanguage } from './../interface/language/language-system.interface';
import { LanguageActionCreator } from './../store/action-creators/language.actioncreator';
import { SYSTEM_LANGUAGES } from '../config/translation/language.list';
import { TRANSLATION } from './../config/translation/translation';

@Pipe({
  name: 'translation'
})
export class TranslationPipe implements PipeTransform {
  constructor (private languageActionCreator: LanguageActionCreator) {}
  GetTranslation (id) {
    const systemLanguage: ISystemLanguage = this.languageActionCreator.GetSystemLanguage();
    return TRANSLATION[systemLanguage.code.toUpperCase()][id] ? TRANSLATION[systemLanguage.code.toUpperCase()][id] : id;
  }
  transform(value: any, args?: any): any {
    return this.GetTranslation(value);
  }

}
