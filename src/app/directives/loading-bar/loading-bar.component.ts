import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  template: `<div class="progress">
              <div class="progress-bar progress-bar-striped active" role="progressbar"
              aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%"></div>
            </div>`
})

export class LoadingBarComponent implements OnInit {
  constructor () {}
  ngOnInit () {}
}
