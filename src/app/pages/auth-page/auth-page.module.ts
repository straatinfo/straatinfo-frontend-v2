import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarAuthModule } from '../../shared/navbar-auth/navbar-auth.module';
import { FooterModule } from '../../shared/footer/footer.module';
import { AuthPageRoutes } from './auth-page.routing';
import { LoginComponent } from './login/login.component';

import { ComponentModule } from '../../components/component.module';
import { RegisterComponent } from './register/register.component';
import { SpinnerComponent, DirectiveModule } from '../../directives';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthPageRoutes),
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarAuthModule,
    FooterModule,
    ComponentModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  entryComponents: [
    SpinnerComponent
  ]
})

export class AuthPageModule {}
