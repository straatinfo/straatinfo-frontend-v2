import { IHost } from '../host/host.interface';

export interface IDesign {
  _id?: string;
  designName?: string;
  colorOne?: string;
  colorTwo?: string;
  colorThree?: string;
  colorFour?: string;  
  url?: string;
  secure_url?: string;
  _host?: IHost
}
