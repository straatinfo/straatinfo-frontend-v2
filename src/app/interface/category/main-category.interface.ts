import { IHost } from "../host/host.interface";
import { IReportType } from '../report/report-type.interface';
import { ILanguage } from '../language/language.interface';

export interface IMainCategory {
  _id?: string;
  name?: string;
  dutch?: string;
  description?: string;
  translations?: ILanguage[];
  _host?: IHost;
  _reportType?: IReportType;
}
