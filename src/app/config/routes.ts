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
const ADMIN: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
  },
  {
    path: '/admin/host',
    title: 'Host List',
    type: 'link',
    icontype: 'view_list'
  },
  {
    path: '/admin/add-host',
    title: 'Add Host',
    type: 'link',
    icontype: 'note_add'
  },
  {
    path: '/admin/report',
    title: 'Reports',
    type: 'link',
    icontype: 'update'
  },
  {
      path: '/admin/reporter',
      title: 'Reporters',
      type: 'link',
      icontype: 'update'
  },
  {
      path: '/admin/design',
      title: 'General Design',
      type: 'link',
      icontype: 'settings'
  },
  {
    path: '/auth/login',
    title: 'Logout',
    type: 'link',
    icontype: 'exit_to_app'
  }
];

const HOST: RouteInfo[] = [
  {
    path: '/host/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
  },
  {
    path: '/host/report',
    title: 'Reports',
    type: 'link',
    icontype: 'update'
  },
  {
    path: '/auth/login',
    title: 'Logout',
    type: 'link',
    icontype: 'exit_to_app'
  }
]

export const ROUTES = {
  ADMIN: ADMIN,
  HOST: HOST
}
