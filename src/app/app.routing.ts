
import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes =[
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        {
          path: 'admin',
          loadChildren: './dashboard/dashboard.module#DashboardModule'
        }
      ]
    },
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        {
          path: 'host',
          loadChildren: './dashboard/dashboard.module#DashboardModule'
        }
      ]
    },
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        {
          path: 'member',
          loadChildren: './dashboard/dashboard.module#DashboardModule'
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

