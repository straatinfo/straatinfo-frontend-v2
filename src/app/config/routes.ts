//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

//Menu Items
const ADMIN: RouteInfo[] = [{
  path: '/admin/dashboard',
  title: 'Dashboard',
  type: 'link',
  icontype: 'dashboard'
}];

export const ROUTES = {
  ADMIN: ADMIN
}
