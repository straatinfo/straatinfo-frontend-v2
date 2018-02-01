import { IUser } from '../user/user.interface';
import { IHost } from '../host/host.interface';
import { IReportType } from './report-type.interface';
import { IMainCategory } from '../category/main-category.interface';
import { ISubCategory } from '../category/sub-category.interface';
import { IPriority } from '../priority/priority.interface';

export interface IReport {
  id?: number;
  generatedReportId?: string;
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
  reportTypeId?: number;
  reportType?: IReportType;
  mainCategoryId?: number;
  mainCategory?: IMainCategory;
  subCategoryId?: number;
  subCategory?: ISubCategory;
  priorityId?: number;
  priority?: IPriority;
  reporterId?: number;
  reporter?: IUser;
  hostId?: number;
  host?: IHost;
  createdAt?: Date;
  updatedAt?: Date;
}
