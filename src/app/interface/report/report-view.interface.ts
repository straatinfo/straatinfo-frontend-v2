export interface IReportView {
  _id?: string;
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
  peopleInvolvedDescription?: string;
  vehicleInvolvedCount?: number;
  peopleInvolvedCount?: number;
  _reportType?: string;
  _reportTypeCode?: string;
  _reportTypeName?: string;
  _mainCategory?: string;
  _mainCategoryName?: string;
  _subCategory?: string;
  _subCategoryName?: string;
  _subCategoryCode?: string;
  _reporter?: string;
  _reporterName?: string;
  _team?: string;
  _teamName?: string;
  _host?: string;
  _hostName?: string;
  _hostEmail?: string;
  date?: string;
  causeOfFinished?: string;
  finishedDate: string;
  createdAt?: Date;
  updatedAt?: Date;
}