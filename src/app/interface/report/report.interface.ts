import { IUser } from '../user/user.interface';
import { IHost } from '../host/host.interface';
import { IReportType } from './report-type.interface';
import { IMainCategory } from '../category/main-category.interface';
import { ISubCategory } from '../category/sub-category.interface';
import { ITeam } from '../team/team.interface';

export interface IReport {
  _id?: string;
  generatedReportId?: string;
  hostName: string;
  title?: string;
  description?: string;
  location?: string;
  long?: number;
  lat?: number;
  note?: string; // this is for host to fill in
  status?: string;
  isVehicleInvolved?: boolean;
  isPeopleInvolved?: boolean;
  vehicleInvolvedDescription?: string;
  peopleInvolvedCount?: number;
  _reportType?: IReportType;
  _mainCategory?: IMainCategory;
  _subCategory?: ISubCategory;
  _reporter?: IUser;
  _host?: IHost;
  _team: ITeam;
  date?: string;  
  causeOfFinished?: string;
  reportType: string;
  finishedDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
