export interface IReportView {
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
  _reportType?: string;
  _mainCategory?: string;
  _subCategory?: string;
  _reporter?: string;
  _host?: string;
  date?: string;
  finishedDate: string;
  createdAt?: Date;
  updatedAt?: Date;
}