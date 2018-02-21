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
  reportTypeCode?: string;
  mainCategoryName?: string;
  subCategoryName?: string;
  reporterName?: string;
  teamName: string;
  date?: string;
  causeOfFinished?: string;
  finishedDate: string;
  createdAt?: Date;
  updatedAt?: Date;
}