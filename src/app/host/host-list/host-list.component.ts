import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { HostActionCreator, TableActionCreator } from '../../store/action-creators';
import { ISession } from '../../interface/session/session.interface';
import { IUser } from '../../interface/user/user.interface';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { IHostView } from '../../interface/host/host-view.interface';

@Component({
    selector: 'app-host-list',
    templateUrl: './host-list.component.html',
    styleUrls: ['./host-list.component.scss']
})
export class HostListComponent implements OnInit {

    private hostSubscription: Subscription = null;

    @select(s => s.host.hosts) hosts;
    @select(s => s.table.page) page;
    @select(s => s.host.spinner) hostSpinner;

    public hostData = [];

    public dataNames = [
        'hostName', 'email', 'city', 'country', 'design'
    ];
    public dataAliases = [
        'Host Name', 'Email', 'City', 'Country', 'Design'
    ];

    constructor(
        private hostActionCreator: HostActionCreator,
        private router: Router,
        private tableActionCreator: TableActionCreator
    ) { }

    ngOnInit() {
        this.hostActionCreator.ResetSelectedHost();
        this.hostActionCreator.GetHosts();
        this.tableActionCreator.ResetPage();

        this.hostSubscription = this.hosts
            .subscribe(host => {
                this.hostData = host;
            });
    }

    onMoreClick(event) {
        this.hostActionCreator.SelectHost(event._id);
        this.router.navigate([`admin/host/${event._id}`]);
    }

    onDownload() {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = this.padLeft((date.getMonth() + 1).toString(), '0', 2);
        const day = this.padLeft(date.getDate().toString(), '0', 2);
        const hour = this.padLeft(date.getHours().toString(), '0', 2);
        const minutes = this.padLeft(date.getMinutes().toString(), '0', 2);
        const formattedDate = year + month + day + "_" + hour + minutes;

        var options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: false,
            useBom: true
        };

        var mapData = [];
        mapData.push(this.HostHeader());
        this.hostData.map(d => mapData.push(this.HostData(d)));
        var fileName = 'Host_' + formattedDate;
        new Angular2Csv(mapData, fileName, options);
    }

    private HostData(data: IHostView): any {
        return {
            id: data._id || '',
            fname: data.fname || '',
            lname: data.lname,
            city: data.city || '',
            country: data.country || '',
            design: data.design || '',
            designType: data.designType || '',
            email: data.email || '',
            hostName: data.hostName || '',
            hostPersonalEmail: data.hostPersonalEmail || '',
            houseNumber: data.houseNumber || '',
            isBlocked: data.isBlocked || '',
            isPatron: data.isPatron || '',
            isSpecific: data.isSpecific || '',
            lat: data.lat || '',
            long: data.long || '',
            phoneNumber: data.phoneNumber || '',
            postalCode: data.postalCode || '',
            state: data.state || '',
            streetName: data.streetName || '',
            roleCode: data._roleCode || '',
            roleName: data._roleName || '',
        };
    }

    private HostHeader(): any {
        return {
            id: "Id",
            fname: "First Name",
            lname: "Last Name",
            city: 'City',
            country: 'Country',
            design: 'Design',
            designType: 'Design Type',
            email: 'Email',
            hostName: 'Host Name',
            hostPersonalEmail: 'Host Personal Email',
            houseNumber: 'House Number',
            isBlocked: 'Is Blocked',
            isPatron: 'Is Patron',
            isSpecific: 'Is Specific',
            lat: 'Latitude',
            long: 'Longtitude',
            phoneNumber: 'Phone Number',
            postalCode: 'Postal Code',
            state: 'State',
            streetName: 'Street Name',
            roleCode: 'Role Code',
            roleName: 'Role Name',
        };
    }

    private padLeft(text: string, padChar: string, size: number): string {
        return (String(padChar).repeat(size) + text).substr((size * -1), size);
    }

}
