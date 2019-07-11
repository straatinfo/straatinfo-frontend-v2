import { IRole } from '../role/role.interface';
import { IMediaUpload } from '../media-upload/media-upload.interface';

export interface IHost {
  _id?: string;
  hostName?: string;
  hostAlternateName?: string;
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
  isSpecific?: boolean;
  design?: string;
  fname?: string;
  lname?: string;
  hostPersonalEmail?: string;
  designType?: string;
  isPatron?: boolean;
  isActivated?: boolean;
  language?: string;
  _role?: IRole;
  _activeDesign?: string;
  designs?: IMediaUpload[]
}
