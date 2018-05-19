import { Component, OnInit } from '@angular/core';
import { SessionActionCreator } from './store/action-creators';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  constructor(
    private sessionActionCreator: SessionActionCreator,
    private router: Router
  ) { }

  ngOnInit() {
    $.material.init();
    console.log(this.router.url);
    this.sessionActionCreator.SessionCheck();
  }
}
