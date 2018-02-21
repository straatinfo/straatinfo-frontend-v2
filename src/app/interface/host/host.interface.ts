import { IRole } from '../role/role.interface';

export interface IHost {
  _id?: string;
  hostName?: string;
  email?: string;
  username?: string;
  houseNumber?: string;
  streetName?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  lat?: number;
  long?: number;
  phoneNumber?: string;
  isBlocked?: boolean;
  design?: string;
  fname?: string;
  lname?: string;
  hostPersonalEmail: string;
  _role?: IRole;
}
