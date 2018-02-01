import { IHost } from "../host/host.interface";

export interface IMainCategory {
  id?: number;
  name?: string;
  description?: string;
  hostId?: number;
  host?: IHost;
}
