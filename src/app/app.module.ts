import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';

// service
import { ServiceModule } from './services';

import { AppRoutes } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { NavbarAuthModule } from './shared/navbar-auth/navbar-auth.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { rootReducer, INITIAL_STATE, IAppState } from './store/app.store';
import { ActionCreatorModule } from './store/action-creators/action-creator.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { HostLayoutComponent } from './layouts/host/host-layout.component';
import { MemberLayoutComponent } from './layouts/member/member-layout.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    NgReduxModule,
    NgReduxRouterModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    ServiceModule.forRoot(),
    ActionCreatorModule.forRoot(),
    NavbarModule,
    FooterModule,
    SidebarModule,
    NavbarAuthModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    HostLayoutComponent,
    MemberLayoutComponent
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    ngReduxRouter: NgReduxRouter,
    devTools:DevToolsExtension){
    const enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore( rootReducer, INITIAL_STATE, [], enhancers );
    ngReduxRouter.initialize();
  }
}
