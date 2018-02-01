export interface IReportView {
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
  reportType: string;
  mainCategoryId?: number;
  mainCategory?: string;
  subCategoryId?: number;
  subCategory?: string;
  priorityId?: number;
  priority?: string;
  reporterId?: number;
  reporter?: string;
  hostId?: number;
  host?: string;
  date?: string;
  createdAt?: Date;
  updatedAt?: Date;
}