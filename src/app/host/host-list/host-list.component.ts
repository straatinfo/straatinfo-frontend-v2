import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { HostActionCreator } from '../../store/action-creators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-list',
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.scss']
})
export class HostListComponent implements OnInit {

  @select(s => s.host.hosts) hosts;

  constructor(
    private router: Router,
    private hostActionCreator: HostActionCreator
  ) { }

  ngOnInit() {
    this.hostActionCreator.GetHosts();
  }

  getDetails(id: number) {
    this.router.navigate([`/admin/host-detail/${id}`]);
  }

}
