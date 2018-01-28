import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutes } from './pages.routing';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavbarAuthModule } from '../shared/navbar-auth/navbar-auth.module';
import { FooterModule } from '../shared/footer/footer.module';
import { MemberRegistraionComponent } from './member-registration/member-registraion.component';
import { HostRegistrationComponent } from './host-registraion/host-registration.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    NavbarAuthModule,
    FooterModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    MemberRegistraionComponent,
    HostRegistrationComponent
  ],
  entryComponents: [
  ]
})

export class PagesModule {}
