import { IHost } from '../host/host.interface';
import { IMediaUpload } from '../media-upload/media-upload.interface';

export interface IDesign {
  _id?: string;
  designName?: string;
  colorOne?: string;
  colorTwo?: string;
  colorThree?: string;
  colorFour?: string;  
  _profilePic?: IMediaUpload;
  _host?: IHost
}
