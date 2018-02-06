import { IRole } from '../role/role.interface';

export interface IUser {
  _id?: string;
  fname?: string;
  lname?: string;
  gender?: string;
  address?: string;
  nickName?: string;
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
  isPatron?: boolean;
  _role?: IRole;
}
