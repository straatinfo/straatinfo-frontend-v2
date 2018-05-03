import { ILanguage } from '../language/language.interface';

export interface ISubCategoryView {
  _id?: string;
  name?: string;
  dutch?: string;
  description?: string;
  translations?: ILanguage[];
  _mainCategory?: string;
  _mainCategoryName?: string;
}
