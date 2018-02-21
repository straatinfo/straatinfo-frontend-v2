import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { HostActionCreator } from '../../store/action-creators';

@Component({
  selector: 'app-host-list',
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.scss']
})
export class HostListComponent implements OnInit {

  @select(s => s.host.hosts) hosts;
  @select(s => s.table.page) page;
  @select(s => s.host.spinner) hostSpinner;

  public dataNames = [
    'hostName', 'email', 'houseNumber', 'city', 'country'
  ];
  public dataAliases = [
    'Host Name', 'Email', '#', 'City', 'Country'
  ];

  constructor(
    private hostActionCreator: HostActionCreator,
    private router: Router
  ) { }

  ngOnInit() {
      this.hostActionCreator.GetHosts();
  }

  onMoreClick(event) {
    this.hostActionCreator.SelectHost(event._id);
    this.router.navigate([`admin/host/${event._id}`]);
  }

}
