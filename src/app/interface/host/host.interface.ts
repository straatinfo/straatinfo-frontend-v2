import { IRole } from '../role/role.interface';

export interface IHost {
  id?: number;
  institutionName?: string;
  email?: string;
  username?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  nickName?: string;
  lat?: number;
  long?: number;
  role?: IRole;
}
