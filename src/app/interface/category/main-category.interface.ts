import { IHost } from "../host/host.interface";
import { IReportType } from '../report/report-type.interface';

export interface IMainCategory {
  _id?: string;
  name?: string;
  description?: string;
  _host?: IHost;
  _reportType?: IReportType;
}
