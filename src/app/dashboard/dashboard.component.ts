import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public title = 'dashboard.title';
  public body = 'dashboard.body';
  ngOnInit() { }
}
