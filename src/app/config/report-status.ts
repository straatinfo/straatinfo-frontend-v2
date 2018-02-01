import { IReportStatus } from '../interface/report/report-status.interface';

export const REPORT_STATUS: IReportStatus[] = [
  { id: 1, name: 'Unresolved', value: 'UNRESOLVED' },
  { id: 2, name: 'Resolved', value: 'RESOLVED' },
  { id: 3, name: 'Expired', value: 'EXPIRED' }
];
