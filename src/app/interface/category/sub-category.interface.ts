import { IMainCategory } from "./main-category.interface";
import { ILanguage } from '../language/language.interface';

export interface ISubCategory {
  _id?: string;
  name?: string;
  dutch?: string;
  description?: string;
  translations?: ILanguage[];
  _mainCategory?: IMainCategory;
}
