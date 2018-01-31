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

  public dataNames = [
    'hostName', 'email', 'houseNumber', 'streetName', 'city', 'state', 'country', 'postalCode', 'phoneNumber'
  ];
  public dataAliases = [
    'Host Name', 'Email', '#', 'Street', 'City', 'State', 'Country', 'Postal Code', 'Phone'
  ];

  constructor(
    private hostActionCreator: HostActionCreator,
    private router: Router
  ) { }

  ngOnInit() {
    this.hostActionCreator.GetHosts();
  }

  onMoreClick(event) {
    this.hostActionCreator.SelectHost(event.id);
    this.router.navigate([`admin/host/${event.id}`]);
  }

}
