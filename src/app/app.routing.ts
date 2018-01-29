
import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { HostLayoutComponent } from './layouts/host/host-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { MemberLayoutComponent } from './layouts/member/member-layout.component';

export const AppRoutes: Routes =[
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        {
          path: 'admin',
          loadChildren: './admin-page/admin-page.module#AdminModule'
        }
      ]
    },
    {
      path: '',
      component: HostLayoutComponent,
      children: [
        {
          path: 'host',
          loadChildren: './host-page/host-page.module#HostPageModule'
        }
      ]
    },
    {
      path: '',
      component: MemberLayoutComponent,
      children: [
        {
          path: 'member',
          loadChildren: './member-page/member-page.module#MemberModule'
        }
      ]
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [
        {
          path: 'auth',
          loadChildren: './pages/pages.module#PagesModule'
        }
      ]
    },
    {
      path: '**',
      redirectTo: 'auth',
      pathMatch: 'full'
    }
];

