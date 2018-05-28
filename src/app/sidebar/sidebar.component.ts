import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import * as _ from 'lodash';
import { ROUTES } from '../config';
import { ISession } from 'app/interface/session/session.interface';
import { IUser } from 'app/interface/user/user.interface';
import { ISystemLanguage } from './../interface/language/language-system.interface';
import { SYSTEM_LANGUAGES } from '../config/translation/language.list';
import { LanguageActionCreator } from '../store/action-creators';

declare const $: any;


@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public systemLanguages: ISystemLanguage[] = SYSTEM_LANGUAGES;
  public session: ISession = JSON.parse(localStorage.getItem('session'));
  public user: IUser = this.session.user;
  public profileLink: string = `/${this.user._role.code.toLowerCase()}/profile`;

  constructor (private languageActionCreator: LanguageActionCreator) {}

  getRole (): string {
    if (this.session) {
      return this.session.user._role.code;
    }
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  ngOnInit() {
    this.menuItems = ROUTES[this.getRole()].filter(menuItem => menuItem);
  }
  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      const ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  onSystemLanguageSelect(code: string) {
    const systemLanguage = _.find(SYSTEM_LANGUAGES, (l) => code.toUpperCase() === l.code.toUpperCase());
    this.languageActionCreator.SetSystemLanguage(systemLanguage);
    window.location.reload();
  }
}
