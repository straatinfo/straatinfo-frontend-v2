import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'auth',
      pathMatch: 'full',
    }, 
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        {
          path: 'admin',
          loadChildren: './pages/admin-page/admin-page.module#AdminPageModule'
        }
      ]
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [
        {
          path: 'auth',
          loadChildren: './pages/auth-page/auth-page.module#AuthPageModule'
        }
      ]
    },
    {
      path: '**',
      redirectTo: 'auth',
      pathMatch: 'full'
    }
];
