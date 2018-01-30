import { IRole } from '../role/role.interface';

export interface IHost {
  id?: number;
  hostName?: string;
  email?: string;
  username?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  nickName?: string;
  lat?: number;
  long?: number;
  roleId?: number;
  role?: IRole;
}
