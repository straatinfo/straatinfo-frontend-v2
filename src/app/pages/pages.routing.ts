import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


export const PagesRoutes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: '',
    children: [{
      path: 'sign-in',
      component: SignInComponent
    }, {
      path: 'sign-up',
      component: SignUpComponent
    }]
  },
  {
    path: '**',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  }
];
