import { ILanguage } from '../language/language.interface';

export interface IMainCategoryView {
  _id?: string;
  name?: string;
  dutch?: string;
  description?: string;
  translations?: ILanguage[];
  _reportType?: string;
  _reportTypeCode?: string;
  _reportTypeName?: string;
  _host?: string;
  _hostName?: string;
}
