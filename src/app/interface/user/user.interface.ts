import { IRole } from '../role/role.interface';

export interface IUser {
  id?: number;
  institutionName?: string;
  fname?: string;
  lname?: string;
  email?: string;
  username?: string;
  gender?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  nickName?: string;
  lat?: number;
  long?: number;
  role?: IRole;
}
